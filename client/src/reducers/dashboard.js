import { FETCH_DASHBOARD_DETAILS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD_DETAILS:
      return action.payload;
    default:
      return state;
  }
};
