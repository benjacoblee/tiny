import { combineReducers } from "redux";
import alertReducer from "./alerts";
import authReducer from "./auth";
import articleReducer from "./article";
import articlesReducer from "./articles";
import pageReducer from "./page";

export default combineReducers({
  alerts: alertReducer,
  auth: authReducer,
  article: articleReducer,
  articles: articlesReducer,
  page: pageReducer
});
