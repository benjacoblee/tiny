import { combineReducers } from "redux";
import authReducer from "./auth";
import articleReducer from "./article"

export default combineReducers({
  auth: authReducer,
  article: articleReducer
});
