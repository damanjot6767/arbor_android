import AsyncStorage from "@react-native-async-storage/async-storage"

export const saveTokenToAsyncStorage = async(token) => {
      try {
        await AsyncStorage.setItem('profile', JSON.stringify({ ...token }));
      } catch (error) {
        console.log(error.message)
      }
    }

export const getTokenFromStorage = async(token) => {
    try {
       const token= await AsyncStorage.getItem('profile');
       return JSON.parse(token)
      } catch (error) {
        console.log(error.message)
      }
}