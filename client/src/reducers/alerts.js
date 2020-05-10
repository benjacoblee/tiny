import { ALERT } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ALERT:
      return action.payload;
    default:
      return state;
  }
};
