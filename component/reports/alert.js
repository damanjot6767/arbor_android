import { Alert } from "react-native";
export const ReportErrorAlert =(err)=>{
    Alert.alert(
        'ArborHawk !',
        `${err}`,
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
