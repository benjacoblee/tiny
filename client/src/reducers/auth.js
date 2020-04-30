import { AUTH_USER } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return "ASD";
    default:
      return state;
  }
};
