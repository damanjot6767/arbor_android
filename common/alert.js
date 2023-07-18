import { Alert } from "react-native";
export const ErrorAlert =(err)=>{
    Alert.alert(
        'ArborHawk !',
        `${err.response?.data?.error ? err.response?.data?.error : err.response.data.msg ? err.response.data.msg:"Something went wrong"}`,
        [
          {
            text: 'OK',
            onPress: () => console.log("ok"),
            style: 'default', // sdf'default', 'cancel', 'destructive'
          },            
          // Add more buttons with styles here.
        ],
      );
}
