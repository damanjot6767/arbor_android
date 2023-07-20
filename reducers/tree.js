import { ACTION_TYPES } from "../constants/actionTypes";

const initialState = {
    species:[],    
    healthRate:[],
    recomendations:[],
    jurisdiction:[],
    reportTrees:[],
    trees:[],
    editTree:{},
    speciesValue:{},
    healthRateValue:{},
    recomendation:{},
    loader:false,
    tloader:false,
    sloader:false
}

export const tree = (state = initialState, action)=>{

    switch(action.type){
        case ACTION_TYPES.FETCH_SPECIES_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.FETCH_SPECIES_SUCCESS:
            return {...state, species: action.payload, loader:false}
        case ACTION_TYPES.FETCH_SPECIES_FAILED:
            return {...state, loader:false}

        case ACTION_TYPES.FETCH_HEALTHRATE_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.FETCH_HEALTHRATE_SUCCESS:
            return {...state, healthRate: action.payload, loader:false}
        case ACTION_TYPES.FETCH_HEALTHRATE_FAILED:
            return {...state, loader:false}

        case ACTION_TYPES.FETCH_RECOMENDATIONS_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.FETCH_RECOMENDATIONS_SUCCESS:
            return {...state, recomendations: action.payload, loader:false}
        case ACTION_TYPES.FETCH_RECOMENDATIONS_FAILED:
            return {...state, loader:false}

        case ACTION_TYPES.FETCH_JURISDICTION_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.FETCH_JURISDICTION_SUCCESS:
            return {...state, jurisdiction: action.payload, loader:false}
        case ACTION_TYPES.FETCH_JURISDICTION_FAILED:
            return {...state, loader:false}
            
        case ACTION_TYPES.SAVE_TREE_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.SAVE_TREE_SUCCESS:
            return {...state, trees: action.payload, loader:false}
        case ACTION_TYPES.SAVE_TREE_FAILED:
            return {...state, loader:false}

        case ACTION_TYPES.EMPTY_TREES_REQUEST:
            return {...state, sloader:true}
        case ACTION_TYPES.EMPTY_TREES_SUCCESS:
            return {...state, trees:action.payload, speciesValue:"", sloader:false}
        case ACTION_TYPES.EMPTY_TREES_FAILED:
            return {...state, sloader:false}

        case "EMPTY TREES":
            return {...state, trees: action.payload, loader:false}
        case "EMPTY_EDIT_TREE":
            return {...state, editTree: action.payload, loader:false}
        case ACTION_TYPES.SET_TREE_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.SET_TREE_SUCCESS:
            return {...state, editTree: action.payload, loader:false}
        case ACTION_TYPES.SET_TREE_FAILED:
            return {...state, loader:false}
            
        case ACTION_TYPES.EDIT_TREE_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.EDIT_TREE_SUCCESS:
            return {...state, trees: action.payload, editTree : action.payload, loader: false}
        case ACTION_TYPES.EDIT_TREE_FAILED:
            return {...state, loader:false}

        case ACTION_TYPES.FETCH_TREE_REQUEST:
            return {...state, tloader:true}
        case ACTION_TYPES.FETCH_TREE_SUCCESS:
            return {...state, reportTrees: action.payload, tloader:false}
        case ACTION_TYPES.FETCH_TREE_FAILED:
            return {...state, tloader:false}
        
        case "SAVE_SPECIES":
            return {...state, speciesValue: action.payload, loader:false}
        case "SAVE_HEALTHRATING":
            return {...state, healthRateValue: action.payload, loader:false}
        case "SAVE_RECOMENDATION":
            return {...state, recomendation: action.payload, loader:false}
        case "EMPTY_RECOMENDATION":
            return {...state, recomendation: action.payload, loader:false}

        case "EMPTY_SPECIES":
            return {...state, speciesValue: action.payload, loader:false}
        case "EMPTY_HEALTHRATE":
            return {...state, healthRateValue: action.payload, loader:false}

        case ACTION_TYPES.SET_EDIT_TREE_RECOMENDATIONS:
            return {...state, editTree: {...state.editTree, recomendations: action.payload}}
        default:
            return state;
    }
}