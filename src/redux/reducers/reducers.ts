import { combineReducers } from "redux";
import { redux_types } from "../types";
import { ActionObject } from "../../Interfaces";

function dataReducer(state = [], action: ActionObject) {
  if (action.type === redux_types.getData) {
    return action.payload;
  }

  return state;
}

export default combineReducers({
  dataReducer,
});
