import {
  SUBMIT_ARTICLE,
  EDIT_ARTICLE,
  FETCH_ARTICLE,
  POST_COMMENT
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_ARTICLE:
      console.log("submitting article");
      return { ...state, id: action.payload };
    case FETCH_ARTICLE:
      console.log("fetching article");
      console.log(action.payload);
      return action.payload;
    case EDIT_ARTICLE:
      console.log("editing article sending id");
      return { ...state, id: action.payload };
    case POST_COMMENT:
      return action.payload;
    default:
      return state;
  }
};
