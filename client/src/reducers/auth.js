import {
  AUTH_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FETCH_USER
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return action.payload;
    case REGISTER_USER:
      return action.payload;
    case LOGOUT_USER:
      return action.payload;
    case FETCH_USER:
      return action.payload;
    default:
      return state;
  }
};
