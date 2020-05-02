import { combineReducers } from "redux";
import authReducer from "./auth";
import articleReducer from "./article";
import articlesReducer from "./articles";

export default combineReducers({
  auth: authReducer,
  article: articleReducer,
  articles: articlesReducer
});
