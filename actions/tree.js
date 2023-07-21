import { ACTION_TYPES } from "../constants/actionTypes";
import {
    fetchHealthRates,
    fetchJurisdiction,
    fetchRecomendations,
    fetchTreeSpecies,
    saveTree,
    updateTree
   
} from "../services/api";
import { ErrorAlert } from "../common/alert";

export const fetchSpecies = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.FETCH_SPECIES_REQUEST })
        const { data } = await fetchTreeSpecies();
        dispatch({ type: ACTION_TYPES.FETCH_SPECIES_SUCCESS, payload: data.data })
    }
    catch (err) {
        console.log(err.message)
        dispatch({ type: ACTION_TYPES.FETCH_SPECIES_FAILED })
        ErrorAlert(err)  
    }
}

export const fetchHealthRate = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.FETCH_HEALTHRATE_REQUEST })
        const { data } = await fetchHealthRates();
        dispatch({ type: ACTION_TYPES.FETCH_HEALTHRATE_SUCCESS, payload: data.data })
    }
    catch (err) {
        console.log(err.message)
        dispatch({ type: ACTION_TYPES.FETCH_HEALTHRATE_FAILED })
        ErrorAlert(err)  

    }
}

export const fetchRecomendation = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.FETCH_RECOMENDATIONS_REQUEST })
        const { data } = await fetchRecomendations();
        dispatch({ type: ACTION_TYPES.FETCH_RECOMENDATIONS_SUCCESS, payload: data.data })
    }
    catch (err) {
        console.log(err.message)
        dispatch({ type: ACTION_TYPES.FETCH_RECOMENDATIONS_FAILED })
        ErrorAlert(err)  

    }
}

export const getJurisdiction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.FETCH_JURISDICTION_REQUEST })
        const { data } = await fetchJurisdiction()
        dispatch({ type: ACTION_TYPES.FETCH_JURISDICTION_SUCCESS, payload: data.data })
    } catch (err) {
        console.log(err)
        dispatch({ type: ACTION_TYPES.FETCH_JURISDICTION_FAILED })
        ErrorAlert(err)  

    }
}
export const fetchAllTrees = (reportId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.FETCH_TREE_REQUEST })
        const { data } = await fetchTrees(reportId)
        dispatch({ type: ACTION_TYPES.FETCH_TREE_SUCCESS, payload: data.data })
    }
    catch (err) {
        console.log(err.message)
        dispatch({ type: ACTION_TYPES.FETCH_TREE_FAILED })
        ErrorAlert(err)  

    }
}

export const addTree = (reportId, res) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.SAVE_TREE_REQUEST })
        const { data } = await saveTree(reportId, res)
        dispatch({ type: ACTION_TYPES.SAVE_TREE_SUCCESS, payload: data.data })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: ACTION_TYPES.SAVE_TREE_FAILED })
        ErrorAlert(err)  

    }
}

export const setTree = (res) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.SET_TREE_REQUEST })
        dispatch({ type: ACTION_TYPES.SET_TREE_SUCCESS, payload: res })
    }
    catch (err) {
        console.log(err.message);
        dispatch({ type: ACTION_TYPES.SET_TREE_FAILED })
        ErrorAlert(err)  
    }
}

export const editTree = (reportId, treeId, res) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.EDIT_TREE_REQUEST })
        const { data } = await updateTree(reportId, treeId, res)
        dispatch({ type: ACTION_TYPES.EDIT_TREE_SUCCESS, payload: data.data })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: ACTION_TYPES.EDIT_TREE_FAILED })
        ErrorAlert(err)  

    }
}

export const deleteReportTree = (reportId, treeId, navigate) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.DELETE_TREE_REQUEST })
        const { data } = await deleteTree(reportId, treeId)
        dispatch({ type: ACTION_TYPES.DELETE_TREE_SUCCESS })
        NotificationManager.success(data.msg)
        dispatch(fetchAllTrees(reportId))
    }
    catch (err) {
        console.log(err.message)
        dispatch({ type: ACTION_TYPES.DELETE_TREE_FAILED })
        ErrorAlert(err)  

    }
}

export const emptyTrees = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.EMPTY_TREES_REQUEST })
        dispatch({ type: ACTION_TYPES.EMPTY_TREES_SUCCESS, payload: {} })
    } catch (err) {
        console.log(err.message)
        dispatch({ type: ACTION_TYPES.EMPTY_TREES_FAILED })
        ErrorAlert(err)  

    }
}

export const addDuplicateTree = (reportId, treeId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_TYPES.DUPLICATE_TREE_REQUEST })
        const { data } = await duplicateTree(reportId, treeId)
        dispatch({ type: ACTION_TYPES.DUPLICATE_TREE_SUCCESS, payload: data.data })
        NotificationManager.success("Duplicate Tree added successfully")
        dispatch(fetchAllTrees(reportId))
    } catch (err) {
        console.log(err.message)
        dispatch({ type: ACTION_TYPES.DUPLICATE_TREE_FAILED })
        ErrorAlert(err)  
    }
}