import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import GlobalStyles from "../../common/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { Color } from "../../constants/colors";
import { countryCodes } from "../../common/countryCode";



const arbor = {
  firstName: "rajni",
  lastName: "bala",
  email: "123@yopmail.com",
  profileImage: "ok done",
  phoneNumber: "1234567899",
  countryCode: "+91",
  experience: "20",
  projectsCompleted: "10",
  bio: "okkk",
  address: "njkshksjak",
  isaNumber: "nmkdsjks",
};

export default function EditProfile() {
  
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

  const handleLinkPress = (link) => {
    Linking.openURL(link);
  };

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
              <TextInput
                label="code"
                mode="flat"
                theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
                style={{ backgroundColor: "transparent", fontSize: 16,width:70 }}
                value={profile?.countryCode}
                textColor={Color.black}
              />
              <TextInput
                label="PHONE NUMBER"
                mode="flat"
                theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
                style={{ backgroundColor: "transparent", fontSize: 16,flex:1 }}
                onChangeText={(text) => handleInputChange("phoneNumber", text)}
                value={profile?.phoneNumber}
                textColor={Color.black}
              />
            </View>

            <TextInput
              label="EXPERIENCE"
              mode="flat"
              theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
              style={{ backgroundColor: "transparent", fontSize: 16 }}
              onChangeText={(text) => handleInputChange("experience", text)}
              value={profile?.experience}
              textColor={Color.black}
            />
            <TextInput
              label="PROJECTS"
              mode="flat"
              theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
              style={{ backgroundColor: "transparent", fontSize: 16 }}
              onChangeText={(text) => handleInputChange("projects", text)}
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
          </View>
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
  textStyle: {
    color: "black",
    fontSize: 16,
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
    gap:7
  },
});
