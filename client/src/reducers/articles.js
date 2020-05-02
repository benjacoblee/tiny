import { FETCH_ARTICLES } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
