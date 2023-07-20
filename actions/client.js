import { Alert } from "react-native";
import { ErrorAlert } from "../common/alert";
import { ACTION_TYPES } from "../constants/actionTypes";
import { addArboristClient, deleteClient, editClient, fetchAllClients, fetchClientTypes } from "../services/api";
import { arboristLogout } from "./arborLogin";

export const fetchClientType = () => async (dispatch) => {
    try {
        dispatch({ type: ACTION_TYPES.FETCH_CLIENT_TYPES_REQUEST })
        const { data } = await fetchClientTypes();
        dispatch({ type: ACTION_TYPES.FETCH_CLIENT_TYPES_SUCCESS, payload: data.data })
    }
    catch (err) {
        console.log(err.message);
        dispatch({ type: ACTION_TYPES.FETCH_CLIENT_TYPES_FAILED })
       
    }
}

export const addClient = (res, navigation) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.ADD_CLIENT_REQUEST })
        const { data } = await addArboristClient(res)
        dispatch({ type: ACTION_TYPES.ADD_CLIENT_SUCCESS, payload: data.data })
        // dispatch({ type: "ADD_CLIENT", reportClient: data.data })
        // location?.state?.data === "/addReport" ? navigate("/addReport", { state: { data: data.data } }) :
        //     location?.state?.data === "/editReport" ? navigate("/editReport", { state: { data: data.data } }) :
        //         navigate("/clientManager")
        // !validateUserType() && dispatch(fetchClients())
      
      if (data.status === "success") {
          navigation.navigate("Clients")
          dispatch(fetchClients())
      }
    }
    catch (err) {
        console.log(err);
        dispatch({ type: ACTION_TYPES.ADD_CLIENT_FAILED })
        ErrorAlert(err)    
        if(err.response.data.error==="Session Expired"){
            dispatch(arboristLogout())
        }
    }
}

export const fetchClients = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.FETCH_CLIENT_REQUEST })
        const { data } = await fetchAllClients()
        console.log("data", data)
        dispatch({ type: ACTION_TYPES.FETCH_CLIENT_SUCCESS, payload: data.data })
        console.log("calling api ")
    }
    catch (err) {
        console.log(err?.response);
        dispatch({ type: ACTION_TYPES.FETCH_CLIENT_FAILED })
    }
}

export const setClient = (res) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.SET_CLIENT_REQUEST })
        console.log(res)
        dispatch({ type: ACTION_TYPES.SET_CLIENT_SUCCESS, payload: res })
    }
    catch (err) {
        console.log(err.message);
        dispatch({ type: ACTION_TYPES.SET_CLIENT_FAILED })
        ErrorAlert(err)    
        if(err.response.data.error==="Session Expired"){
            dispatch(arboristLogout())
        }
    }
}

export const editClientData = (res, navigation) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.EDIT_CLIENT_REQUEST })
        const { client } = getState().client
        const { data } = await editClient(client._id, res)
        dispatch({ type: ACTION_TYPES.EDIT_CLIENT_SUCCESS })
        dispatch(fetchClients())
        navigation.navigate("Clients")
    }
    catch (err) {
        console.log(err.message);
        dispatch({ type: ACTION_TYPES.EDIT_CLIENT_FAILED })
        ErrorAlert(err)    
        if(err.response.data.error==="Session Expired"){
            dispatch(arboristLogout())
        }
    }
}

export const deleteClientData = (clientId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.DELETE_CLIENT_REQUEST })
        const { data } = await deleteClient(clientId)
        dispatch({ type: ACTION_TYPES.DELETE_CLIENT_SUCCESS })
        Alert.alert("Success", "Client deleted successfully.")
        dispatch(fetchClients())
    }
    catch (err) {
        console.log(err.message);
        dispatch({ type: ACTION_TYPES.DELETE_CLIENT_FAILED })
        NotificationError(err)
    }
}

export const saveClientContact = (res) => async (dispatch, getState) => {
    try {
        const { clientContact } = getState().client
        dispatch({ type: "SAVE_CONTACT_DETAIL", payload: [...clientContact, ...res] })
    }
    catch (err) {
        console.log(err.message);
        dispatch({ type: "SAVE_CONTACT_DETAIL_FAILED" })
        NotificationError(err)
    }
}

export const setClientContact = (res) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.SET_CLIENT_CONTACT_REQUEST })
        console.log(res)
        dispatch({ type: ACTION_TYPES.SET_CLIENT_CONTACT_SUCCESS, payload: res })
    }
    catch (err) {
        console.log(err.message);
        dispatch({ type: ACTION_TYPES.SET_CLIENT_CONTACT_FAILED })
        NotificationError(err)
    }
}

export const fetchClientsWithReportId = (reportId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.FETCH_REPORT_CLIENT_REQUEST })
        const { data } = await fetchClientWithId(reportId)
        dispatch({ type: ACTION_TYPES.FETCH_REPORT_CLIENT_SUCCESS, payload: data.data })
    } catch (err) {
        console.log(err.message);
        dispatch({ type: ACTION_TYPES.FETCH_REPORT_CLIENT_FAILED })
        NotificationError(err)
    }
}