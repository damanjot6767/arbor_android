import { ACTION_TYPES } from "../constants/actionTypes";

const initialState = {
    clients: [],
    client: {},
    clientTypes: [],
    clientContact: [],
    editClientContact: {},
    reportClient: {},
    clientEmailContacts: {},
    editClientContactDetail: {},
    loader: false
}

export const client = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.ADD_CLIENT_REQUEST:
            return { ...state, loader: true }
        case ACTION_TYPES.ADD_CLIENT_SUCCESS:
            return { ...state, clients: action.payload, loader: false }
        case ACTION_TYPES.ADD_CLIENT_FAILED:
            return { ...state, loader: false }

        case ACTION_TYPES.FETCH_CLIENT_REQUEST:
            return { ...state, loader: true }
        case ACTION_TYPES.FETCH_CLIENT_SUCCESS:
            return { ...state, clients: action.payload, loader: false }
        case ACTION_TYPES.FETCH_CLIENT_FAILED:
            return { ...state, loader: false }

        case ACTION_TYPES.FETCH_REPORT_CLIENT_REQUEST:
            return { ...state, loader: true }
        case ACTION_TYPES.FETCH_REPORT_CLIENT_SUCCESS:
            return { ...state, clientEmailContacts: action.payload, loader: false }
        case ACTION_TYPES.FETCH_REPORT_CLIENT_FAILED:
            return { ...state, loader: false }

        case ACTION_TYPES.SET_CLIENT_REQUEST:
            return { ...state, loader: true }
        case ACTION_TYPES.SET_CLIENT_SUCCESS:
            return { ...state, client: action.payload, loader: false }
        case ACTION_TYPES.SET_CLIENT_FAILED:
            return { ...state, loader: false }

        case ACTION_TYPES.EDIT_CLIENT_REQUEST:
            return { ...state, loader: true }
        case ACTION_TYPES.EDIT_CLIENT_SUCCESS:
            return { ...state, loader: false }
        case ACTION_TYPES.DELETE_CLIENT_FAILED:
            return { ...state, loader: false }
        case ACTION_TYPES.FETCH_CLIENT_TYPES_REQUEST:
            return { ...state, loader: true }
        case ACTION_TYPES.FETCH_CLIENT_TYPES_SUCCESS:
            return { ...state, clientTypes: action.payload, loader: false }
        case ACTION_TYPES.FETCH_CLIENT_TYPES_FAILED:
            return { ...state, loader: false }

        case "SAVE_CONTACT_DETAIL":
            return { ...state, clientContact: action.payload }
        case "SAVE_CONTACT_DETAIL_FAILED":
            return { ...state }
        case "EDIT_CLIENT_CONTACT":
            return { ...state, editClientContact: action.payload }
        case "SET_CLIENT_DETAIL":
            return { ...state, editClientContact: action.payload }
        case "DELETE_CLIENT_CONTACT":
            return { ...state, clientContact: state.clientContact.filter((item, index) => item !== action.payload) }
        case "REMOVE ALL CONTACTS":
            return { ...state, clientContact: [] }
        case "ADD_CLIENT":
            return { ...state, reportClient: action.payload }
        case ACTION_TYPES.SET_CLIENT_CONTACT_REQUEST:
            return { ...state, loader: true }
        case ACTION_TYPES.SET_CLIENT_CONTACT_SUCCESS:
            return { ...state, editClientContactDetail: action.payload, loader: false }
        case ACTION_TYPES.SET_CLIENT_CONTACT_FAILED:
            return { ...state, loader: false }

        default:
            return state;
    }
}