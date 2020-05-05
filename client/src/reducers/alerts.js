import {
  ALERT_LOGIN_SUCCESS,
  ALERT_LOGIN_FAIL,
  ALERT_LOGOUT_SUCCESS,
  ALERT_REGISTER_SUCCESS,
  ALERT_REGISTER_FAIL,
  ALERT_SUBMITTING_ARTICLE,
  ALERT_SUBMITTING_BIO
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ALERT_LOGIN_SUCCESS:
      return action.payload;
    case ALERT_LOGIN_FAIL:
      return action.payload;
    case ALERT_LOGOUT_SUCCESS:
      return action.payload;
    case ALERT_REGISTER_SUCCESS:
      return action.payload;
    case ALERT_REGISTER_FAIL:
      return action.payload;
    case ALERT_SUBMITTING_ARTICLE:
      return action.payload;
    case ALERT_SUBMITTING_BIO:
      return action.payload;
    default:
      return state;
  }
};
