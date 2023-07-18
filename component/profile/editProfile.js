import {
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyles from "../../common/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, TextInput } from "react-native-paper";
import { Color } from "../../constants/colors";
import { CountryPicker } from "react-native-country-codes-picker";
import DatePicker from "react-native-date-picker";
import { getProfile } from "../../actions/arborLogin";
import { useDispatch, useSelector } from "react-redux";


export default function EditProfile() {
  const { arbor } = useSelector(({ arboristLogin }) => arboristLogin)
  const dispatch = useDispatch()

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState("");
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [socialModalVisible, setSocialModalVisible] = useState(false);
  const [accreditationInfo, setAccreditationInfo] = useState({
    accreditation: "",
    accreditationReference: "",
  });
  const [socialInfo, setSocialInfo] = useState({
    linkName: "",
    link: "https://www.",
  });

  const [profile, setProfile] = useState({
    firstName: arbor?.firstName ? arbor.firstName : "",
    lastName: arbor?.lastName ? arbor.lastName : "",
    email: arbor?.email ? arbor.email : "",
    profileImage: arbor?.profileImage ? arbor.profileImage : "",
    phoneNumber: arbor?.phoneNumber ? arbor?.phoneNumber : "",
    countryCode: arbor?.countryCode ? arbor.countryCode : "",
    experience: arbor?.experience ? arbor?.experience : "",
    projectsCompleted: arbor?.projectsCompleted ? arbor.projectsCompleted : "",
    bio: arbor?.bio ? arbor?.bio : "",
    address: arbor?.address ? arbor.address : "",
    isaNumber: arbor?.isaNumber ? arbor.isaNumber : "",
    accreditation: arbor?.accreditation?.length > 0 ? arbor?.accreditation : [],
    links: arbor?.links?.length > 0 ? arbor.links : [],
    // linkName: arbor?.linkName ? arbor.linkName : "",
    // link: arbor?.link ? arbor.link : "",
    // signatureImage: arbor?.signatureImage ? arbor.signatureImage : ""
  });
  
  const handleInputChange = (name, value) => {
    setProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateInput = (selectedDateParam) => {
    const selectedDate = new Date(selectedDateParam);
    const currentDate = new Date();
    const diffInMilliseconds = currentDate - selectedDate;

    const years = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60 * 24 * 365)) /
        (1000 * 60 * 60 * 24 * 30)
    );
    const days = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );

    const experience = `${years} year, ${months} months, ${days} days`;
    setProfile({ ...profile, experience: diffInMilliseconds });
    setDate1(experience);
  };

  const handleLinkPress = (link) => {
    Linking.openURL(link);
  };

  const handleLink = (case1) => {
    switch (case1) {
      case "accreditation":
        setProfile({
          ...profile,
          accreditation: [...profile?.accreditation, accreditationInfo],
        });
        setModalVisible(false);
        break;
      case "social":
        setProfile({ ...profile, links: [...profile?.links, socialInfo] });
        setModalVisible(false);
        break;

      default:
        break;
    }
  };

  const disableDatesAfterCurrent = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    return currentDate;
  };
  useEffect(() => {
    dispatch(getProfile())

  }, []);

  useEffect(() => {
    const data = new Date(profile?.experience)
    handleDateInput(data)
  }, [])

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.profileLogo}>
            <Image
              source={require("../../assets/images/userAv.png")}
              style={styles.imageStyle}
            />
            <Text style={styles.textStyle}>Damanjot Singh</Text>
          </View>

          <View style={styles.profileDetail}>
            <TextInput
              label="FIRST NAME"
              mode="flat"
              theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
              style={{ backgroundColor: "transparent", fontSize: 16 }}
              onChangeText={(text) => handleInputChange("firstName", text)}
              value={profile?.firstName}
              textColor={Color.black}
            />
            <TextInput
              label="LAST NAME"
              mode="flat"
              theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
              style={{ backgroundColor: "transparent", fontSize: 16 }}
              onChangeText={(text) => handleInputChange("lastName", text)}
              value={profile?.lastName}
              textColor={Color.black}
            />
            <TextInput
              label="EMAIL"
              mode="flat"
              theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
              style={{ backgroundColor: "transparent", fontSize: 16 }}
              value={profile?.email}
              textColor={Color.black}
              disabled={true}
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
                  <Text style={{ marginBottom: 1, fontSize: 12, marginTop: 1 }}>
                    CODE
                  </Text>
                  <Text style={{ color: Color.black, fontSize: 16 }}>
                    {profile?.countryCode}
                  </Text>
                </View>
              </TouchableWithoutFeedback>

              <TextInput
                label="PHONE NUMBER"
                mode="flat"
                theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
                style={{
                  backgroundColor: "transparent",
                  fontSize: 16,
                  flex: 1,
                }}
                onChangeText={(text) => handleInputChange("phoneNumber", text)}
                value={profile?.phoneNumber}
                textColor={Color.black}
              />
            </View>

            <TouchableWithoutFeedback onPress={() => setOpen(true)}>
              <View
                style={{
                  flex: 1,
                  paddingVertical: 9,
                  borderBottomWidth: 1,
                  borderBottomColor: Color.gray,
                  paddingHorizontal: 15,
                }}
              >
                <Text style={{ marginBottom: 1, fontSize: 12, marginTop: 1 }}>
                  EXPERIENCE
                </Text>
                <Text style={{ color: Color.black, fontSize: 16 }}>
                  {date1}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TextInput
              label="PROJECTS"
              mode="flat"
              theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
              style={{ backgroundColor: "transparent", fontSize: 16 }}
              onChangeText={(text) =>
                handleInputChange("projectsCompleted", text)
              }
              value={profile?.projectsCompleted}
              textColor={Color.black}
            />
            <TextInput
              label="ISA NUMBER"
              mode="flat"
              theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
              style={{ backgroundColor: "transparent", fontSize: 16 }}
              onChangeText={(text) => handleInputChange("isaNumber", text)}
              value={profile?.isaNumber}
              textColor={Color.black}
            />
            <TextInput
              label="BIO"
              mode="flat"
              theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
              style={{ backgroundColor: "transparent", fontSize: 16 }}
              onChangeText={(text) => handleInputChange("isaNumber", text)}
              value={profile?.isaNumber}
              textColor={Color.black}
              multiline
              numberOfLines={4}
            />
            <TextInput
              label="ADDRESS"
              mode="flat"
              theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
              style={{ backgroundColor: "transparent", fontSize: 16 }}
              onChangeText={(text) => handleInputChange("address", text)}
              value={profile?.address}
              textColor={Color.black}
              multiline
              numberOfLines={4}
            />

            <View
              style={{
                gap: profile?.accreditation?.length > 0 ? 8 : 2,
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
              {profile?.accreditation?.length > 0 ? (
                profile?.accreditation?.map((item) => (
                  <View key={item._id} style={styles.cardItemStyle}>
                    <Text style={styles.textStyle}>{item.accreditation}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        handleLinkPress(item.accreditationReference)
                      }
                    >
                      <Text style={{ color: "blue" }}>
                        {item.accreditationReference}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text style={[styles.textStyle, { paddingHorizontal: 15 }]}>
                  Not exist
                </Text>
              )}
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text
                  style={{
                    marginTop: 10,
                    color: Color.black,
                    fontWeight: "500",
                    paddingHorizontal: 15,
                  }}
                >
                  + Accereditation links
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                gap: profile?.accreditation?.length > 0 ? 8 : 2,
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
                Social Links
              </Text>
              {profile?.links?.length > 0 ? (
                profile?.links?.map((item) => (
                  <View key={item._id} style={styles.cardItemStyle}>
                    <Text style={styles.textStyle}>{item.linkName}</Text>
                    <TouchableOpacity
                      onPress={() => handleLinkPress(item.link)}
                    >
                      <Text style={{ color: "blue" }}>{item.link}</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text style={[styles.textStyle, { paddingHorizontal: 15 }]}>
                  Not exist
                </Text>
              )}
              <TouchableOpacity onPress={() => setSocialModalVisible(true)}>
                <Text
                  style={{
                    marginTop: 10,
                    color: Color.black,
                    fontWeight: "500",
                    paddingHorizontal: 15,
                  }}
                >
                  + Add Social Link
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <CountryPicker
            show={show}
            // when picker button press you will get the country object with dial code
            pickerButtonOnPress={(item) => {
              setProfile({ ...profile, countryCode: item.dial_code });
              setShow(false);
            }}
            style={styles.countryCodeStyle}
          />
          <DatePicker
            mode="date"
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
              handleDateInput(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
            maximumDate={disableDatesAfterCurrent()}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Accreditation</Text>

                <TextInput
                  theme={{
                    colors: { primary: Color.gray, outline: Color.gray },
                  }}
                  label="Social Name"
                  value={accreditationInfo?.accreditation}
                  onChangeText={(text) =>
                    setAccreditationInfo({
                      ...accreditationInfo,
                      accreditation: text,
                    })
                  }
                  style={styles.input}
                />

                <TextInput
                  theme={{
                    colors: { primary: Color.gray, outline: Color.gray },
                  }}
                  label="Social Link"
                  alue={accreditationInfo?.accreditationReference}
                  onChangeText={(text) =>
                    setAccreditationInfo({
                      ...accreditationInfo,
                      accreditationReference: text,
                    })
                  }
                  style={styles.input}
                />

                <Button
                  mode="contained"
                  onPress={() => handleLink("accreditation")}
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
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={socialModalVisible}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Socail links</Text>

                <TextInput
                  theme={{
                    colors: { primary: Color.gray, outline: Color.gray },
                  }}
                  label="Social Name"
                  value={socialInfo?.linkName}
                  onChangeText={(text) =>
                    setSocialInfo({
                      ...socialInfo,
                      linkName: text,
                    })
                  }
                  style={styles.input}
                />

                <TextInput
                  theme={{
                    colors: { primary: Color.gray, outline: Color.gray },
                  }}
                  label="Social Link"
                  value={socialInfo?.link}
                  onChangeText={(text) =>
                    setSocialInfo({
                      ...socialInfo,
                      link: text,
                    })
                  }
                  style={styles.input}
                />

                <Button
                  mode="contained"
                  onPress={() => handleLink("social")}
                  style={styles.saveButton}
                >
                  Save
                </Button>

                <Button
                  mode="outlined"
                  onPress={() => setSocialModalVisible(false)}
                  style={styles.cancelButton}
                  textColor={Color.black}
                >
                  Cancel
                </Button>
              </View>
            </View>
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
  profileLogo: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    gap: 6,
  },
  imageStyle: {
    width: 135,
    height: 135,
    borderRadius: 100,
    resizeMode: "cover",
  },
  profileDetail: {
    flex: 1,
    gap: 1,
    marginVertical: 18,
  },
  cardItemStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    gap: 2,
    paddingVertical: 8,
  },
  sigNatureStyle: {
    width: "100%",
    height: 125,
    borderRadius: 10,
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
  cardItemStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Color.gray,
    gap: 2,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  openModalButton: {
    fontSize: 18,
    color: "blue",
    textDecorationLine: "underline",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopEndRadius: 10,
    width: "100%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
    color: Color.black,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "transparent",
    fontSize: 16,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: Color.main,
    color: Color.white,
  },
  cancelButton: {
    marginTop: 10,
    borderColor: Color.main,
  },
});
