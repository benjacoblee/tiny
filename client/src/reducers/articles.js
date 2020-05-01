import { SUBMIT_ARTICLE, FETCH_ARTICLE } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SUBMIT_ARTICLE:
      console.log("HIHI");
      return [action.payload];
    case FETCH_ARTICLE:
      console.log("NINI")
      return action.payload;
    default:
      return state;
  }
};
