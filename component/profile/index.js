import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyles from "../../common/globalStyles";
import { getProfile } from "../../actions/arborLogin"
import { useDispatch, useSelector } from "react-redux";


export default function Profile() {
  const dispatch = useDispatch()
  const { arbor } = useSelector(({ arboristLogin }) => arboristLogin)
 

  useEffect(() => {
    dispatch(getProfile())
  }, [])

  // const [profile, setProfile] = useState({
  //   firstName: arbor?.firstName ? arbor.firstName : "",
  //   lastName: arbor?.lastName ? arbor.lastName : "",
  //   email: arbor?.email ? arbor.email : "",
  //   profileImage: arbor?.profileImage ? arbor.profileImage : "",
  //   phoneNumber: arbor?.phoneNumber ? arbor?.phoneNumber : "",
  //   countryCode: arbor?.countryCode ? arbor.countryCode : "",
  //   experience: arbor?.experience ? arbor?.experience : "",
  //   projectsCompleted: arbor?.projectsCompleted ? arbor.projectsCompleted : "",
  //   bio: arbor?.bio ? arbor?.bio : "",
  //   address: arbor?.address ? arbor.address : "",
  //   isaNumber: arbor?.isaNumber ? arbor.isaNumber : "",
  //   accreditations: arbor?.accreditations ? arbor?.accreditations : [],
  //   links: arbor?.links ? arbor.links : [],
  //   linkName: arbor?.linkName ? arbor.linkName : "",
  //   link: arbor?.link ? arbor.link : "",
  //   signatureImage: arbor?.signatureImage ? arbor?.signatureImage : ""
  // });

  const [expYear, setExpYear] = useState("")
  useEffect(() => {
    const data = new Date(arbor?.experience)
    countExperience(data)
  }, [])

  const countExperience = (v) => {
    let today = new Date();
    const getExperience = new Date(v)
    const timeDiff = Math.abs(today.getTime() - getExperience.getTime());
    const getExperienceMonth = Math.floor(timeDiff / (1000 * 3600 * 24 * 30)) % 12;
    const getExperienceYear = Math.floor(timeDiff / (1000 * 3600 * 24 * 365));
    const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24)) % 31;
    setExpYear(`${getExperienceYear ? getExperienceYear : 0} year ${getExperienceMonth ? getExperienceMonth : 0} months ${diffDays ? diffDays : 0} days`)
  }


  const handleLinkPress = (link) => {
    Linking.openURL(link);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.profileLogo}>
          {
            arbor?.profileImage ?
              <Image
                source={{ uri: arbor?.profileImage ? arbor?.profileImage : "" }}
                style={styles.imageStyle}
              /> :
              <Image
                source={arbor?.profileImage ? arbor?.profileImage : require("../../assets/images/userAv.png")}
                style={styles.imageStyle}
              />
          }
          <Text style={styles.textStyle}>{arbor?.firstName}</Text>
        </View>

        <View style={styles.profileDetail}>
          <View style={{ gap: 2 }}>
            <Text style={GlobalStyles.defaultText}>EMAIL</Text>
            <Text style={styles.textStyle}>{arbor?.email}</Text>
          </View>
          <View style={{ gap: 2 }}>
            <Text style={GlobalStyles.defaultText}>PHONE NUMBER</Text>
            <Text style={styles.textStyle}>{`${arbor?.countryCode} ${arbor?.phoneNumber}`}</Text>
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
              <Text style={styles.textStyle}>{arbor?.projectsCompleted}</Text>
            </View>
            <View style={{ gap: 2 }}>
              <Text style={GlobalStyles.defaultText}>EXPERIENCE</Text>
              <Text style={styles.textStyle}>{expYear}</Text>
            </View>
          </View>
          <View style={{ gap: 2 }}>
            <Text style={GlobalStyles.defaultText}>ISA NUMBER</Text>
            <Text style={styles.textStyle}>{arbor?.isaNumber}</Text>
          </View>
          <View style={{ gap: 2 }}>
            <Text style={GlobalStyles.defaultText}>BIO</Text>
            <Text style={styles.textStyle}>{arbor?.bio}</Text>
          </View>
          <View style={{ gap: 2 }}>
            <Text style={GlobalStyles.defaultText}>ADDRESS</Text>
            <Text style={styles.textStyle}>{arbor?.address}</Text>
          </View>
          <View style={{ gap: arbor?.accreditations?.length > 0 ? 8 : 2 }}>
            <Text style={GlobalStyles.defaultText}>ACCEREDITATION</Text>
            {arbor?.accreditations?.length > 0 ? (
              arbor?.accreditations?.map((item) => (
                <View key={item._id} style={styles.cardItemStyle}>
                  <Text style={styles.textStyle}>{item.accreditation}</Text>
                  {/* <TouchableOpacity onPress={() => handleLinkPress(item.accreditationReference)}> */}
                  <Text style={{ color: "blue" }}>{item.accreditationReference}</Text>
                  {/* </TouchableOpacity> */}
                </View>
              ))
            ) : (
              <Text style={styles.textStyle}>Not exist</Text>
            )}
          </View>

          <View style={{ gap: arbor?.links?.length > 0 ? 8 : 2 }}>
            <Text style={GlobalStyles.defaultText}>SOCIAL LINK</Text>
            {arbor?.links?.length > 0 ? (
              arbor?.links?.map((item) => (
                <View key={item._id} style={styles.cardItemStyle}>
                  <Text style={styles.textStyle}>{item.linkName}</Text>
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
            {arbor?.signatureImage ?
              <Image
                source={{ uri: arbor?.signatureImage ? arbor.signatureImage : "" }}
                style={styles.sigNatureStyle}
              /> :
              <Image
                source={arbor?.profileImage ? arbor?.profileImage : require("../../assets/images/userAv.png")}
                style={styles.imageStyle}
              />
            }
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
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
    width: null,
    resizeMode: 'contain',
    height: 100,
    borderRadius: 10,
  },

});
