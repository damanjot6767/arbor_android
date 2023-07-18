import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACTION_TYPES } from "../constants/actionTypes";
import {
    arboristsLogin,
    forgotPassword,
    generatePassCode
} from "../services/api"
import { Alert } from "react-native";

export const arboristAuth = (res) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.ARBORIST_LOGIN_REQUEST })
        res.email = res.email.toLowerCase()
        const { data } = await arboristsLogin(res)
        console.log("data", data)
        dispatch({ type: ACTION_TYPES.ARBORIST_LOGIN_SUCCESS, payload: data?.data })
    }
    catch (err) {
        console.log("err", err);
        Alert.alert(
            'Error !',
            'Email or Password is incorrect!',
            [
              {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
                style: 'default', // 'default', 'cancel', 'destructive'
              },
             
              // Add more buttons with styles here.
            ],
          );
        dispatch({ type: ACTION_TYPES.ARBORIST_LOGIN_FAILED })
    }
}

export const arboristLogout = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.ARBORIST_LOGOUT_SUCCESS, payload: {} })
    }
    catch (err) {
        console.log(err.message);
        dispatch({ type: ACTION_TYPES.ARBORIST_LOGOUT_FAILED })
        NotificationError(err)    
    }
}

export const forgotPass = (res, navigation) => async (dispatch, getState) => {
    try {
        console.log("res", res)
        dispatch({ type: ACTION_TYPES.ARBORIST_FORGOTPASSWORD_REQUEST })
        const { data } = await forgotPassword(res)
        console.log("data", data)
        dispatch({ type: ACTION_TYPES.ARBORIST_FORGOTPASSWORD_SUCCESS, payload:{} })
        // setCodeSent(false)       
        Alert.alert(
            'ArborHawk !',
            `${data?.msg ? data?.msg : "password reset successfully"} `,
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate("Login"),
                style: 'default', // 'default', 'cancel', 'destructive'
              },            
              // Add more buttons with styles here.
            ],
          );
    }
    catch (err) {
        console.log(err?.response);
        // setCodeSent(false)
        dispatch({ type: ACTION_TYPES.ARBORIST_FORGOTPASSWORD_FAILED, payload:{} })
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
}

export const generateCode = (res, setCodeSent) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.ARBORIST_GENERATECODE_REQUEST })
        const { data } = await generatePassCode(res)
        dispatch({ type: ACTION_TYPES.ARBORIST_GENERATECODE_SUCCESS, payload: res })
        Alert.alert(
            'ArborHawk',
            'password reset code has been sent to your email id! ',
            [
              {
                text: 'OK',
                onPress: () => setCodeSent(true),
                style: 'default', // 'default', 'cancel', 'destructive'
              },
             
              // Add more buttons with styles here.
            ],
          );
    }
    catch (err) {
        console.log(err);
        dispatch({ type: ACTION_TYPES.ARBORIST_GENERATECODE_FAILED })
        NotificationError(err)    

    }
}