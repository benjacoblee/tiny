import { combineReducers } from "redux";
import authReducer from "./auth";
import articleReducer from "./article";
import articlesReducer from "./articles";
import pageReducer from "./page";

export default combineReducers({
  auth: authReducer,
  article: articleReducer,
  articles: articlesReducer,
  page: pageReducer
});
