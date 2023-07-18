import { ACTION_TYPES } from "../constants/actionTypes";

const initialState = {
    properties:[],
    property:{},
    clientProperty:[],
    loader:false
}

export const property =(state= initialState, action)=>{

    switch(action.type){
        case ACTION_TYPES.ADD_PROPERTY_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.ADD_PROPERTY_SUCCESS:
            return {...state, properties:action.paylaod, loader:false}
        case ACTION_TYPES.ADD_PROPERTY_FAILED:
            return {...state,loader:false}

        case ACTION_TYPES.FETCH_PROPERTY_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.FETCH_PROPERTY_SUCCESS:
            return {...state, properties:action.payload, loader:false}
        case ACTION_TYPES.FETCH_PROPERTY_FAILED:
            return {...state, loader:false}

        case ACTION_TYPES.FETCH_CLIENT_PROPERTY_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.FETCH_CLIENT_PROPERTY_SUCCESS:
            return {...state, clientProperty:action.payload, loader:false}
        case ACTION_TYPES.FETCH_CLIENT_PROPERTY_FAILED:
            return {...state, loader:false}  
        
        case ACTION_TYPES.SET_PROPERTY_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.SET_PROPERTY_SUCCESS:
            return {...state, property:action.payload, loader:false}
        case ACTION_TYPES.SET_PROPERTY_FAILED:
            return {...state, loader:false}

        case ACTION_TYPES.EDIT_PROPERTY_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.EDIT_PROPERTY_SUCCESS:
            return {...state, loader:false}
        case ACTION_TYPES.EDIT_PROPERTY_FAILED:
            return {...state, loader:false}
        
        default:
            return state;
    }
}