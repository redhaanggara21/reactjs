import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import barangReducer from "./barangReducer";


export default combineReducers({
  auth,
  message,
  barangReducer
});
