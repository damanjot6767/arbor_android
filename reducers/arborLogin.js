import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACTION_TYPES } from "../constants/actionTypes";
import { saveTokenToAsyncStorage } from "../common/token"
const initialState = {
    arborist: {},
    isLoggedIn: false,
    forgotPasswordEmail: {},
    arbor: {},
    loader: false
}

export const arboristLogin = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.ARBORIST_LOGIN_REQUEST:
            return { ...state, loader: true }
        case ACTION_TYPES.ARBORIST_LOGIN_SUCCESS:
            saveTokenToAsyncStorage(action.payload);
            return { ...state, arborist: action.payload, isLoggedIn: true, loader: false }
        case ACTION_TYPES.ARBORIST_LOGIN_FAILED:
            return { ...state, loader: false }

        case ACTION_TYPES.ARBORIST_LOGOUT_REQUEST:
            return { ...state, loader: true }
        case ACTION_TYPES.ARBORIST_LOGOUT_SUCCESS:
            // localStorage.clear()
            return { ...state, arborist: {}, arbor: {}, isLoggedIn: false, loader: false }
        case ACTION_TYPES.ARBORIST_LOGOUT_FAILED:
            return { ...state, loader: false }

        case ACTION_TYPES.ARBORIST_GENERATECODE_REQUEST:
            return { ...state, loader: true }
        case ACTION_TYPES.ARBORIST_GENERATECODE_SUCCESS:
            return { ...state, forgotPasswordEmail: action.payload, loader: false }
        case ACTION_TYPES.ARBORIST_GENERATECODE_FAILED:
            return { ...state, loader: false }
        case ACTION_TYPES.ARBORIST_FORGOTPASSWORD_SUCCESS:
            return { ...state, forgotPasswordEmail: action.payload, loader: false }
        case ACTION_TYPES.ARBORIST_FORGOTPASSWORD_FAILED:
            return { ...state, forgotPasswordEmail: action.payload, loader: false }
        case ACTION_TYPES.FETCH_ARBOR_PROFILE_REQUEST:
            return { ...state, loader: true }
        case ACTION_TYPES.FETCH_ARBOR_PROFILE_SUCCESS:
            return { ...state, arbor: action.payload, loader: false }
        case ACTION_TYPES.FETCH_ARBOR_PROFILE_FAILED:
            return { ...state, loader: false }

        case ACTION_TYPES.EDIT_ARBOR_PROFILE_REQUEST:
            return { ...state, loader: true, arbor: {} }
        case ACTION_TYPES.EDIT_ARBOR_PROFILE_SUCCESS:
            return { ...state, arbor: action.payload, loader: false }
        case ACTION_TYPES.EDIT_ARBOR_PROFILE_FAILED:
            return { ...state, loader: false }
        default:
            return state
    }

}
