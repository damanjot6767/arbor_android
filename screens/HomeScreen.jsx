import { StyleSheet, Text, View,SafeAreaView ,Image,TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.conatiner1}>
        <View style={styles.conatiner}>
      <Image
        source={require('../assets/images/logo1.png')}
        style={{width: 140, height: 130}}
      />
      <TouchableWithoutFeedback onPress={()=>navigation.navigate("Report List")}>
         <View style ={styles.button}>
          <View style={styles.view1}>
          <Text style={styles.text}>REPORTS
         </Text>
          </View>
         <View style={styles.view2}>
         <Icon name="arrow-right-alt" size={20} color="#fff" />
         </View>
         </View>
        </TouchableWithoutFeedback>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  conatiner1: {
    flex:1,
    width: '100%',
    height: '100%',
    padding:5
  },
  conatiner: {
    flex:1,
    alignItems:'center',
    width: '100%',
    height: '100%',
    paddingVertical:40,
    paddingHorizontal:5
  },
  button:{ 
        flexDirection:"row",
        width:'90%',
        marginTop:"30%",
        borderRadius:50,
        backgroundColor : "#1D4840",
        padding:14,
        justifyContent:'space-between',
        paddingHorizontal:20
  },
  text:{
    color: "#fff",
    alignItems:"center",
    justifyContent:"center"
  },
  view2:{
    marginLeft:10,
    justifyContent:"flex-end"
  },
  view1:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
});
