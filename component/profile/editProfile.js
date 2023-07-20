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
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { Color } from "../../constants/colors";
import { CountryPicker } from "react-native-country-codes-picker";
import DatePicker from "react-native-date-picker";
import { editArborProfile, getProfile } from "../../actions/arborLogin";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { RNS3 } from "react-native-aws3";

let awsLink = "https://d2fpxm3qzpwoxq.cloudfront.net";

export default function EditProfile({ navigation }) {
  const { arbor, loader } = useSelector(({ arboristLogin }) => arboristLogin);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState("");
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [socialModalVisible, setSocialModalVisible] = useState(false);
  const [image, setImage] = useState("");
  const [accreditationInfo, setaccreditationInfo] = useState({
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
    accreditations:
      arbor?.accreditations?.length > 0 ? arbor?.accreditations : [],
    links: arbor?.links?.length > 0 ? arbor.links : [],
    signatureImage: arbor?.signatureImage ? arbor.signatureImage : "",
  });


  const handleInputChange = (name, value) => {
    if (name === "projectsCompleted") {
      setProfile((prevData) => ({
        ...prevData,
        [name]: Number(value),
      }));
    } else {
      setProfile((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
    console.log('experience',experience)
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
          accreditations: [...profile?.accreditations, accreditationInfo],
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

  const ImagePicker = () => {
    let options = {
      storageOptions: {
        path: "image",
      },
    };

    launchImageLibrary(options, (response) => {
      setProfile({ ...profile, profileImage: response.assets[0].uri });
      setImage(response.assets[0]);
      const file = {
        uri: response.assets[0].uri,
        name: response.assets[0].fileName,
        type: "image/jpeg",
      };
      const options = {
        keyPrefix: "profileImages/",
        bucket: "arborhawkapp",
        region: "us-east-2",
        accessKey: "AKIA6EX3U7Z5FERI3RZQ",
        secretKey: "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",
        successActionStatus: 201,
      };
      RNS3.put(file, options).then((response) => {
        console.log(response);
        console.log(response.status);
      });
    });
  };

  const handleEditProfile = () => {
    console.log("profile",profile)
    dispatch(editArborProfile(profile, navigation));
  };
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    const data = new Date(profile?.experience);
    handleDateInput(data);
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      {loader ? (
        <View style={styles.container}>
          <ActivityIndicator
            style={{ flex: 1 }}
            animating={true}
            color={Color.main}
            size={70}
          />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.profileLogo}>
              {profile?.profileImage ? (
                <Image
                  source={{
                    uri: profile?.profileImage ? profile?.profileImage : "",
                  }}
                  style={styles.imageStyle}
                />
              ) : (
                <Image
                  source={
                    profile?.profileImage
                      ? profile?.profileImage
                      : require("../../assets/images/userAv.png")
                  }
                  style={styles.imageStyle}
                />
              )}
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: Color.main,
                    padding: 7,
                    borderRadius: 50,
                    position: "absolute",
                    right: -65,
                    top: -40,
                  }}
                >
                  <Icon name="edit" size={20} color={Color.white} />
                </View>
              </TouchableOpacity>
              <Text style={styles.textStyle}>{profile?.firstName}</Text>
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
                    <Text
                      style={{ marginBottom: 1, fontSize: 12, marginTop: 1 }}
                    >
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
                  theme={{
                    colors: { primary: Color.gray, outline: Color.gray },
                  }}
                  style={{
                    backgroundColor: "transparent",
                    fontSize: 16,
                    flex: 1,
                  }}
                  onChangeText={(text) =>
                    handleInputChange("phoneNumber", text)
                  }
                  value={`${profile?.phoneNumber}`}
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
                value={`${profile?.projectsCompleted}`}
                textColor={Color.black}
                keyboardType="numeric"
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
                {profile?.accreditations?.length > 0 ? (
                  profile?.accreditations?.map((item) => (
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
                  gap: profile?.links?.length > 0 ? 8 : 2,
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

              <TouchableOpacity>
                <View
                  style={{
                    gap: 10,
                    marginTop: 20,
                    marginBottom: 10,
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
                    Signature
                  </Text>
                  {arbor?.signatureImage ? (
                    <Image
                      source={{
                        uri: arbor?.signatureImage ? arbor.signatureImage : "",
                      }}
                      style={styles.sigNatureStyle}
                    />
                  ) : (
                    <Image
                      source={
                        arbor?.profileImage
                          ? arbor?.profileImage
                          : require("../../assets/images/userAv.png")
                      }
                      style={styles.imageStyle}
                    />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleEditProfile}>
                <Button
                  mode="contained"
                  style={[styles.saveButton, { marginBottom: 50 }]}
                >
                  Update Profile
                </Button>
              </TouchableOpacity>
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
                  <Text style={styles.modalTitle}>accreditation</Text>

                  <TextInput
                    theme={{
                      colors: { primary: Color.gray, outline: Color.gray },
                    }}
                    label="Social Name"
                    value={accreditationInfo?.accreditation}
                    onChangeText={(text) =>
                      setaccreditationInfo({
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
                      setaccreditationInfo({
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
      )}
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
  sigNatureStyle: {
    width: null,
    resizeMode: "contain",
    height: 100,
    borderRadius: 10,
  },
  imageStyle: {
    width: 135,
    height: 135,
    borderRadius: 100,
    resizeMode: "cover",
  },
});
