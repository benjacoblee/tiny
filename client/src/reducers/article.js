import { SUBMIT_ARTICLE, FETCH_ARTICLE } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_ARTICLE:
      console.log("submitting article");
      return { ...state, id: action.payload };
    case FETCH_ARTICLE:
      console.log("fetching article");
      console.log(action.payload)
      return action.payload;
    default:
      return state;
  }
};
