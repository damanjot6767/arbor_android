import { ACTION_TYPES } from "../constants/actionTypes";

const initialState = {
    reports:[],  
    allReports:[],
    editReport:{},
    completedSteps:{},
    page:1,
    limit:15,
    reportStatus:"incomplete",
    loader:false,
    rloader:false,
}

export const report =(state = initialState, action)=>{

    switch(action.type){
        case ACTION_TYPES.SAVE_REPORT_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.SAVE_REPORT_SUCCESS:
            return {...state, reports: action.payload, loader:false}
        case ACTION_TYPES.SAVE_REPORT_FAILED:
            return {...state, loader:false}
        
        case ACTION_TYPES.FETCH_REPORT_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.FETCH_REPORT_SUCCESS:
            return {...state, allReports: action.payload, loader:false}
        case ACTION_TYPES.FETCH_REPORT_FAILED:
            return {...state, loader:false}

        case ACTION_TYPES.EMPTY_REPORTS_REQUEST:
            return {...state, rloader:true}
        case ACTION_TYPES.EMPTY_REPORTS_SUCCESS:
            return {...state, reports:action.payload, report:action.payload, trees:action.payload, rloader:false}
        case ACTION_TYPES.EMPTY_REPORTS_FAILED:
            return {...state, rloader:false}
        
        case "COMPLETED STEPS":
            return {...state, completedSteps:action.payload, loader:false}
        case ACTION_TYPES.SET_REPORT_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.SET_REPORT_SUCCESS:
            return {...state, editReport: action.payload, loader:false}
        case ACTION_TYPES.SET_REPORT_FAILED:
            return {...state, loader:false}      
        case "RESET_PAGES":
            return {...state, page:1}
        case ACTION_TYPES.SET_REPORTS_PAGE:
            return {...state, page:action.payload, limit:15,  loader:false}
        case ACTION_TYPES.EDIT_REPORT_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.EDIT_REPORT_SUCCESS:
            return {...state, reports: action.payload, editReport:action.payload, loader:false}
        case ACTION_TYPES.EDIT_REPORT_FAILED:
            return {...state, loader:false}
        case "GENERATE_REPORT_STATUS":
            return {...state, reportStatus:action.payload}
        default:
            return state;
    }     
}