import { ADVANCE_PAGE } from "../actions/types";

export default (state = 0, action) => {
  switch (action.type) {
    case ADVANCE_PAGE:
      console.log("advancing")
      console.log(state++)
      return state++;
    default:
      return state;
  }
};
