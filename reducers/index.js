import { ACTION_TYPES } from "../constants/actionTypes";
import { combineReducers } from "redux";
import { arboristLogin } from "./arborLogin"
import { client } from "./client"
import { property } from "./property";
import { report } from "./report";
import { tree } from "./tree";

const allReducers = combineReducers({ arboristLogin, client, property, report, tree });

const rootReducer = (state, action) => {
    if (action.type === ACTION_TYPES.RESET_APP) {
        state = undefined;
    }
    return allReducers(state, action);
}


export default rootReducer;
