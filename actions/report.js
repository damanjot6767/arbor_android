import { ACTION_TYPES } from "../constants/actionTypes";
import { fetchReports, saveReport, editReport }  from "../services/api";
import { ErrorAlert } from "../common/alert";

export const addReport =(res)=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.SAVE_REPORT_REQUEST})
        const {data} = await saveReport(res);
        dispatch({type: ACTION_TYPES.SAVE_REPORT_SUCCESS, payload:data.data})
        dispatch(getReport())
    }
    catch(err){
        console.log(err)
        dispatch({type: ACTION_TYPES.SAVE_REPORT_FAILED})
        ErrorAlert(err)  
    }
}

export const getReport =(search_text, status)=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.FETCH_REPORT_REQUEST})
        const { page=1, limit=15 } = getState().report
        const filter = {page, limit, search_text, status}
        const {data} = await fetchReports(filter)
        dispatch({type: ACTION_TYPES.FETCH_REPORT_SUCCESS, payload:data})
    }
    catch(err){
        console.log(err.message)
        dispatch({type: ACTION_TYPES.FETCH_REPORT_FAILED})
    }
}

export const setReport =(res)=>async(dispatch, getState)=>{   
    try{
        dispatch({type: ACTION_TYPES.SET_REPORT_REQUEST})
        console.log("res", res)
        dispatch({type: ACTION_TYPES.SET_REPORT_SUCCESS, payload:res})
    }
    catch(err){
        console.log(err.message);
        dispatch({type:ACTION_TYPES.SET_REPORT_FAILED})
        ErrorAlert(err)  
    }
}

export const updateReport = (id, res)=> async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.EDIT_REPORT_REQUEST})
        const {data} = await editReport(id, res)
        dispatch({type: ACTION_TYPES.EDIT_REPORT_SUCCESS, payload:data.data})
    }
    catch(err){
        console.log(err)
        dispatch({type: ACTION_TYPES.EDIT_REPORT_FAILED})
        ErrorAlert(err)  
    }
}

export const deleteReportData =(reportId)=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.DELETE_REPORT_REQUEST})
        const {data} = await deleteReport(reportId)
        dispatch({type: ACTION_TYPES.DELETE_REPORT_SUCCESS})
        NotificationManager.success(data.msg) 
        dispatch(getReport())
    }
    catch(err){
        console.log(err.message)
        dispatch({type: ACTION_TYPES.DELETE_REPORT_FAILED})
        ErrorAlert(err)  
    }
}

export const emptyReports =()=> async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.EMPTY_REPORTS_REQUEST})
        dispatch({type: ACTION_TYPES.EMPTY_REPORTS_SUCCESS, payload:{}})
    } catch(err){
        console.log(err.message)
        dispatch({type: ACTION_TYPES.EMPTY_REPORTS_FAILED})
        ErrorAlert(err)  
    }
}

// export const sendReportUrl =(id, navigate)=> async(dispatch, getState)=>{
//     try{
//         dispatch({type: ACTION_TYPES.SEND_REPORT_URL_REQUEST})
//         const {data} = await generateReport(id)
//         NotificationManager.success(data.msg)
//         dispatch({type: ACTION_TYPES.SEND_REPORT_URL_SUCCESS})
//         navigate("/reports")
//     }catch(err){
//         console.log(err)
//         dispatch({type: ACTION_TYPES.SEND_REPORT_URL_FAILED})
//         ErrorAlert(err)  
//     }
// }