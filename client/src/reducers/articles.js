import { FETCH_ARTICLES } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      console.log(action.payload)
      console.log([...action.payload])
      return [...state, ...action.payload];
    default:
      return state;
  }
};
