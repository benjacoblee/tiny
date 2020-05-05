import { FETCH_ARTICLES, SEARCH_ARTICLES } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      return [...state, ...action.payload];
    case SEARCH_ARTICLES:
      console.log(action.payload)
      return action.payload;
    default:
      return state;
  }
};
