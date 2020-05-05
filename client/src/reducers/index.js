import { combineReducers } from "redux";
import alertReducer from "./alerts";
import authReducer from "./auth";
import dashboardReducer from "./dashboard";
import articleReducer from "./article";
import articlesReducer from "./articles";
import pageReducer from "./page";

export default combineReducers({
  alerts: alertReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  article: articleReducer,
  articles: articlesReducer,
  page: pageReducer
});
