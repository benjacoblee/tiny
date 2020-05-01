import { AUTH_USER, REGISTER_USER } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return action.payload;
    case REGISTER_USER:
      return action.payload;
    default:
      return state;
  }
};
