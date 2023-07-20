import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { CountryPicker } from "react-native-country-codes-picker";
import { Color } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, TextInput } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import { useDispatch, useSelector } from "react-redux";
import { editClientData, fetchClientType } from "../../actions/client";
import formValidation from "../../common/validations/validation";
import Icon from "react-native-vector-icons/MaterialIcons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CHILD_WIDTH = SCREEN_WIDTH * 1.05;

export default function EditClient({ navigation }) {
  const { clientTypes, client } = useSelector(({ client }) => client);
  const [clientType, setClientType] = useState([]);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [clientData, setClientData] = useState({
    clientName: client?.clientName ? client.clientName : "",
    address: client?.address ? client?.address : "",
    clientType: client?.clientType?._id ? client?.clientType?._id : "",
    clientLat: client?.clientLocation?.coordinates[1],
    clientLong: client?.clientLocation?.coordinates[0],
    contacts: client?.contacts?.length > 0 ? client?.contacts : [],
  });
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "",
  });

  const handleInputChange = (name, value) => {
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveContact = () => {
    const validationError = formValidation(contactDetails, "addClientContact");
    if (editIndex === "") {
      if (validationError) return Alert.alert("Error", validationError);
      setClientData({
        ...clientData,
        contacts: [...clientData?.contacts, contactDetails],
      });
    } else {
      const data = clientData?.contacts?.map((ele, ind) =>
        ind === editIndex ? contactDetails : ele
      );
      setClientData({
        ...clientData,
        contacts: data,
      });
      setEditIndex("");
    }

    setModalVisible(false);
    setContactDetails({
      name: "",
      email: "",
      phone: "",
      countryCode: "",
    });
  };

  const handleDeleteContact = (id) => {
    const data = clientData?.contacts?.filter((ele, ind) => ind !== id);
    setClientData({ ...clientData, contacts: data });
  };

  const handleEditContact = (id) => {
    const data = clientData?.contacts?.find((ele, ind) => ind !== id);
    setContactDetails(data);
    setModalVisible(true);
    setEditIndex(id);
  };

  const handleSubmit = () => {
    console.log("client", clientData);
    // const validationError = formValidation(clientData,"addClient");
    // validationError
    //   ? Alert.alert("Error", validationError)
    //   : dispatch(editClient(clientData, navigation));
    dispatch(editClientData(clientData, navigation));
  };
  useEffect(() => {
    dispatch(fetchClientType());
  }, []);

  useEffect(() => {
    if (clientTypes?.length > 0) {
      const data = clientTypes?.map((ele) => {
        return { key: ele?._id, value: ele?.name };
      });
      setClientType(data);
    }
  }, [clientTypes?.length]);

  return (
    <SafeAreaView
      style={styles.safeAreaStyle}
      showsVerticalScrollIndicator={false}
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.profileDetail}>
            <TextInput
              label="Name"
              mode="flat"
              theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
              style={{ backgroundColor: "transparent", fontSize: 16 }}
              onChangeText={(text) => handleInputChange("clientName", text)}
              value={clientData?.clientName}
              textColor={Color.black}
              placeholder="Name"
            />
            <SelectList
              setSelected={(val) => {
                setClientData({ ...clientData, clientType: val });
              }}
              data={clientType}
              save="key"
              boxStyles={{
                borderRadius: 0,
                marginTop: 10,
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomColor: Color.gray,
              }}
              inputStyles={{ color: Color.gray, fontSize: 16, padding: 0 }}
              placeholder="Select Client Type"
              dropdownStyles={{ paddingHorizontal: 10, borderWidth: 0 }}
              dropdownItemStyles={{
                backgroundColor: Color.white,
                marginBottom: 5,
                borderColor: Color.main,
                borderRadius: 6,
                borderWidth: 1,
              }}
            />

            <TextInput
              label="ADDRESS"
              mode="flat"
              theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
              style={{ backgroundColor: "transparent", fontSize: 16 }}
              onChangeText={(text) => handleInputChange("address", text)}
              value={clientData?.address}
              textColor={Color.black}
              multiline
              numberOfLines={4}
            />
            {clientData?.contacts?.length > 0 && (
              <View
                style={{
                  gap: 8,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: Color.black,
                    fontWeight: "600",
                    fontSize: 18,
                    paddingHorizontal: 15,
                  }}
                >
                  Client's Contacts
                </Text>

                {clientData?.contacts?.map((item, index) => (
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    key={index}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        margin: 3,
                        width: CHILD_WIDTH,
                        gap: 30,
                      }}
                    >
                      <TouchableWithoutFeedback
                        onPress={() => handleEditContact(index)}
                      >
                        <View
                          style={{
                            padding: 15,
                            backgroundColor: Color.white,
                            width: "84%",
                            flexDirection: "1",
                            borderRadius: 15,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              marginBottom: 6,
                              color: Color.main,
                              fontWeight: "bold",
                            }}
                          >
                            {item?.name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              marginBottom: 6,
                              color: Color.main,
                              lineHeight: 20,
                            }}
                          >
                            {item?.email}
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              marginBottom: 6,
                              color: Color.main,
                              lineHeight: 20,
                            }}
                          >{`${item?.countryCode} ${item?.phone}`}</Text>
                        </View>
                      </TouchableWithoutFeedback>

                      <View>
                        <Icon
                          name="delete"
                          size={24}
                          color="black"
                          onPress={() => handleDeleteContact(index)}
                        />
                      </View>
                    </View>
                  </ScrollView>
                ))}
              </View>
            )}

            <View
              style={{
                gap: 8,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: Color.black,
                  fontWeight: "600",
                  fontSize: 18,
                  paddingHorizontal: 15,
                }}
              >
                Accereditation
              </Text>

              <Text
                style={{
                  marginTop: 10,
                  color: Color.black,
                  fontWeight: "500",
                  paddingHorizontal: 15,
                }}
                onPress={() => setModalVisible(true)}
              >
                + Add contact
              </Text>
            </View>

            <Button
              mode="contained"
              style={[styles.saveButton, { marginBottom: 50 }]}
              onPress={handleSubmit}
            >
              Save Client
            </Button>
          </View>

          <CountryPicker
            show={show}
            // when picker button press you will get the country object with dial code
            pickerButtonOnPress={(item) => {
              setContactDetails({
                ...contactDetails,
                countryCode: item.dial_code,
              });
              setShow(false);
            }}
            style={styles.countryCodeStyle}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <KeyboardAvoidingView
              style={styles.modalContainer}
              behavior={Platform.OS === "ios" ? "padding" : "position"} // Use 'position' behavior for Android
              keyboardVerticalOffset={Platform.OS === "ios" ? 64 : -120}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Client's Contacts</Text>

                <TextInput
                  theme={{
                    colors: { primary: Color.gray, outline: Color.gray },
                  }}
                  label="Name"
                  value={contactDetails?.name}
                  onChangeText={(text) =>
                    setContactDetails({
                      ...contactDetails,
                      name: text,
                    })
                  }
                  style={{ backgroundColor: "transparent", fontSize: 16 }}
                />

                <TextInput
                  theme={{
                    colors: { primary: Color.gray, outline: Color.gray },
                  }}
                  label="Email"
                  value={contactDetails?.email}
                  onChangeText={(text) =>
                    setContactDetails({
                      ...contactDetails,
                      email: text,
                    })
                  }
                  style={{ backgroundColor: "transparent", fontSize: 16 }}
                />

                <View style={styles.phoneNumberStyle}>
                  <TouchableWithoutFeedback onPress={() => setShow(true)}>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 9,
                        borderBottomWidth: 1,
                        borderBottomColor: Color.gray,
                        paddingHorizontal: 10,
                      }}
                    >
                      <Text
                        style={{ marginBottom: 1, fontSize: 12, marginTop: 1 }}
                      >
                        CODE
                      </Text>
                      <Text style={{ color: Color.black, fontSize: 16 }}>
                        {contactDetails?.countryCode}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>

                  <TextInput
                    label="PHONE NUMBER"
                    mode="flat"
                    theme={{
                      colors: { primary: Color.gray, outline: Color.gray },
                    }}
                    style={{
                      backgroundColor: "transparent",
                      fontSize: 16,
                      flex: 1,
                    }}
                    onChangeText={(text) =>
                      setContactDetails({
                        ...contactDetails,
                        phone: text,
                      })
                    }
                    value={contactDetails?.phone}
                    textColor={Color.black}
                  />
                </View>

                <Button
                  mode="contained"
                  onPress={handleSaveContact}
                  style={styles.saveButton}
                >
                  Save
                </Button>

                <Button
                  mode="outlined"
                  onPress={() => setModalVisible(false)}
                  style={styles.cancelButton}
                  textColor={Color.black}
                >
                  Cancel
                </Button>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileDetail: {
    flex: 1,
    gap: 1,
    marginVertical: 18,
  },

  phoneNumberStyle: {
    flexDirection: "row",
    gap: 7,
  },
  countryCodeStyle: {
    modal: { height: 300 },
    countryButtonStyles: { backgroundColor: Color.ligthMain },
    textInput: {
      backgroundColor: Color.ligthMain,
    },
  },
  textStyle: {
    color: "black",
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: Color.main,
    color: Color.white,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
    color: Color.black,
  },
  phoneNumberStyle: {
    flexDirection: "row",
    gap: 7,
  },
});
