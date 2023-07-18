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

  const data = [
    { id: 1, title: "Item 1", link: "https://example.com" },
    { id: 2, title: "Item 2", link: "https://example.com" },
    { id: 3, title: "Item 3", link: "https://example.com" },
  ];

export default function Profile() {
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
  
  const handleLinkPress = (link) => {
    Linking.openURL(link);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.profileLogo}>
          <Image
            source={require("../../assets/images/userAv.png")}
            style={styles.imageStyle}
          />
          <Text style={styles.textStyle}>{profile?.firstName}</Text>
        </View>

        <View style={styles.profileDetail}>
          <View style={{ gap: 2 }}>
            <Text style={GlobalStyles.defaultText}>EMAIL</Text>
            <Text style={styles.textStyle}>{profile?.email}</Text>
          </View>
          <View style={{ gap: 2 }}>
            <Text style={GlobalStyles.defaultText}>PHONE NUMBER</Text>
            <Text style={styles.textStyle}>{`${profile?.countryCode} ${profile?.phoneNumber}`}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 30,
            }}
          >
            <View style={{ gap: 2 }}>
              <Text style={GlobalStyles.defaultText}>PROJECTS COMPLETED</Text>
              <Text style={styles.textStyle}>{profile?.projectsCompleted}</Text>
            </View>
            <View style={{ gap: 2 }}>
              <Text style={GlobalStyles.defaultText}>EXPERIENCE</Text>
              <Text style={styles.textStyle}>{profile?.experience}</Text>
            </View>
          </View>
          <View style={{ gap: 2 }}>
            <Text style={GlobalStyles.defaultText}>ISA NUMBER</Text>
            <Text style={styles.textStyle}>{profile?.isaNumber}</Text>
          </View>
          <View style={{ gap: 2 }}>
            <Text style={GlobalStyles.defaultText}>BIO</Text>
            <Text style={styles.textStyle}>{profile?.bio}</Text>
          </View>
          <View style={{ gap: 2 }}>
            <Text style={GlobalStyles.defaultText}>ADDRESS</Text>
            <Text style={styles.textStyle}>{profile?.address}</Text>
          </View>
          <View style={{ gap: data?.length > 0 ? 8 : 2 }}>
            <Text style={GlobalStyles.defaultText}>ACCEREDITATION</Text>
            {data?.length > 0 ? (
              data?.map((item) => (
                <View key={item.id} style={styles.cardItemStyle}>
                  <Text style={styles.textStyle}>{item.title}</Text>
                  <TouchableOpacity onPress={() => handleLinkPress(item.link)}>
                    <Text style={{ color: "blue" }}>{item.link}</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.textStyle}>Not exist</Text>
            )}
          </View>
          <View style={{ gap: data?.length > 0 ? 8 : 2 }}>
            <Text style={GlobalStyles.defaultText}>SOCIAL LINK</Text>
            {data?.length > 0 ? (
              data?.map((item) => (
                <View key={item.id} style={styles.cardItemStyle}>
                  <Text style={styles.textStyle}>{item.title}</Text>
                  <TouchableOpacity onPress={() => handleLinkPress(item.link)}>
                    <Text style={{ color: "blue" }}>{item.link}</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.textStyle}>Not exist</Text>
            )}
          </View>
          <View style={{ gap: 2 }}>
            <Text style={GlobalStyles.defaultText}>SIGNATURE</Text>
            <Image
              source={require("../../assets/images/userAv.png")}
              style={styles.sigNatureStyle}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
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
    gap: 18,
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
});
