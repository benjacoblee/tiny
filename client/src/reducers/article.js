import {
  SUBMIT_ARTICLE,
  EDIT_ARTICLE,
  FETCH_ARTICLE,
  POST_COMMENT
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_ARTICLE:
      return { ...state, id: action.payload };
    case FETCH_ARTICLE:
      return action.payload;
    case EDIT_ARTICLE:
      return { ...state, id: action.payload };
    case POST_COMMENT:
      return action.payload;
    default:
      return state;
  }
};
