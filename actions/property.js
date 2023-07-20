import { ACTION_TYPES } from "../constants/actionTypes";
import {
    fetchProperties,
    fetchClientProperty
} from "../services/api";
import { ErrorAlert } from "../common/alert";

export const AddProperty = (res, navigate, location) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.ADD_PROPERTY_REQUEST })
        const { data } = validateUserType() ? await addCompanyProperty(res) : await addProperty(res)
        dispatch({ type: ACTION_TYPES.ADD_PROPERTY_SUCCESS, payload: data.data })
        NotificationManager.success("Property added successfully")
        location?.state?.data === "/addReport" ? navigate("/addReport", { state: { data: data.data } }) :
            location?.state?.data === "/editReport" ? navigate("/editReport", { state: { data: data.data } }) :
                navigate("/properties")
        !validateUserType() && dispatch(fetchAllProperties())
    }
    catch (err) {
        console.log(err.message);
        dispatch({ type: ACTION_TYPES.ADD_PROPERTY_FAILED })
        ErrorAlert(err)
    }
}

export const fetchAllProperties = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.FETCH_PROPERTY_REQUEST })
        const { data } = await fetchProperties()
        dispatch({ type: ACTION_TYPES.FETCH_PROPERTY_SUCCESS, payload: data.data })
    }
    catch (err) {
        console.log(err);
        dispatch({ type: ACTION_TYPES.FETCH_PROPERTY_FAILED })
        ErrorAlert(err)

    }
}

export const setProperty = (res) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.SET_PROPERTY_REQUEST })
        console.log(res)
        dispatch({ type: ACTION_TYPES.SET_PROPERTY_SUCCESS, payload: res })
    }
    catch (err) {
        console.log(err.message);
        dispatch({ type: ACTION_TYPES.SET_PROPERTY_FAILED })
        ErrorAlert(err)
    }
}

export const editProperty = (res, navigate) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.EDIT_PROPERTY_REQUEST })
        const { property } = getState().property
        const { data } = validateUserType() ? await editCompanyProperties(property._id, res) : await editProperties(property._id, res)
        dispatch({ type: ACTION_TYPES.EDIT_PROPERTY_SUCCESS })
        NotificationManager.success("property edit successfully")
        !validateUserType() && dispatch(fetchAllProperties())
        navigate("/properties")
    }
    catch (err) {
        console.log(err.message);
        dispatch({ type: ACTION_TYPES.EDIT_PROPERTY_FAILED })
        ErrorAlert(err)
    }
}

export const deleteproperty = (row, Ids) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.DELETE_PROPERTY_REQUEST })
        const { data } = validateUserType() ? await deleteCompanyProperty(row.arborist, row._id) : await deleteProperty(row._id)
        dispatch({ type: ACTION_TYPES.DELETE_PROPERTY_SUCCESS })
        NotificationManager.success(data.msg)
        validateUserType() ? dispatch(fetchAllProperties(Ids.arborist, Ids.client._id)) : dispatch(fetchAllProperties())
    }
    catch (err) {
        console.log(err.message)
        dispatch({ type: ACTION_TYPES.DELETE_PROPERTY_FAILED })
        ErrorAlert(err)
    }
}

export const getclientProperty = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.FETCH_CLIENT_PROPERTY_REQUEST })
        const { data } = await fetchClientProperty(id)
        dispatch({ type: ACTION_TYPES.FETCH_CLIENT_PROPERTY_SUCCESS, payload: data.data })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: ACTION_TYPES.FETCH_CLIENT_PROPERTY_FAILED })
        ErrorAlert(err)
    }

}