import { ACTION_TYPES } from "../constants/actionTypes";
import { fetchAllClients } from "../services/api";
import { ErrorAlert } from "../common/alert";

export const fetchClientType = () => async (dispatch) => {
    try {
        dispatch({ type: ACTION_TYPES.FETCH_CLIENT_TYPES_REQUEST })
        const { data } = validateUserType() ? await fetchCompanyClientTypes() : await fetchClientTypes();
        dispatch({ type: ACTION_TYPES.FETCH_CLIENT_TYPES_SUCCESS, payload: data.data })
    }
    catch (err) {
        console.log(err.message);
        dispatch({ type: ACTION_TYPES.FETCH_CLIENT_TYPES_FAILED })
        ErrorAlert(err)
    }
}

export const addClient = (res, navigate, location) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.ADD_CLIENT_REQUEST })
        const { data } = validateUserType() ? await addCompanyClient(res) : await addArboristClient(res)
        dispatch({ type: ACTION_TYPES.ADD_CLIENT_SUCCESS, payload: data.data })
        NotificationManager.success("Client added successfully")
        dispatch({ type: "REMOVE ALL CONTACTS" })
        dispatch({ type: "ADD_CLIENT", reportClient: data.data })
        location?.state?.data === "/addReport" ? navigate("/addReport", { state: { data: data.data } }) :
            location?.state?.data === "/editReport" ? navigate("/editReport", { state: { data: data.data } }) :
                navigate("/clientManager")
        !validateUserType() && dispatch(fetchClients())
    }
    catch (err) {
        console.log(err);
        dispatch({ type: ACTION_TYPES.ADD_CLIENT_FAILED })
        ErrorAlert(err)
    }
}

export const fetchClients = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.FETCH_CLIENT_REQUEST })
        const { data } = await fetchAllClients()
        console.log("data", data)
        dispatch({ type: ACTION_TYPES.FETCH_CLIENT_SUCCESS, payload: data.data })
    }
    catch (err) {
        console.log(err?.response);
        dispatch({ type: ACTION_TYPES.FETCH_CLIENT_FAILED })
        ErrorAlert(err)
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
    }
}

export const editClientData = (res, navigate) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.EDIT_CLIENT_REQUEST })
        const { client } = getState().client
        const { data } = validateUserType() ? await editCompanyClient(client._id, res) : await editClient(client._id, res)
        dispatch({ type: ACTION_TYPES.EDIT_CLIENT_SUCCESS })
        NotificationManager.success("Client edit successfully")
        navigate("/clientManager")
        !validateUserType() && dispatch(fetchClients())
    }
    catch (err) {
        console.log(err.message);
        dispatch({ type: ACTION_TYPES.EDIT_CLIENT_FAILED })
        ErrorAlert(err)
    }
}

export const deleteClientId = (row, arboristId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.DELETE_CLIENT_REQUEST })
        const { data } = validateUserType() ? await deleteCompanyClient(row.arborist, row._id) : await deleteClient(row._id)
        dispatch({ type: ACTION_TYPES.DELETE_CLIENT_SUCCESS })
        NotificationManager.success(data.msg)
        validateUserType() ? dispatch(fetchClients(arboristId)) : dispatch(fetchClients())
    }
    catch (err) {
        console.log(err.message);
        dispatch({ type: ACTION_TYPES.DELETE_CLIENT_FAILED })
        ErrorAlert(err)
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
        ErrorAlert(err)
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
        ErrorAlert(err)
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
        ErrorAlert(err)
    }
}