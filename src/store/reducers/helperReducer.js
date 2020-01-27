import { CHANGE_SEARCH_TEXT, CHECKED_ITEMS } from "../actions/types";

const initialState = {
  searchText: "",
  checkedItems: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.value
      };
    case CHECKED_ITEMS:
      return {
        ...state,
        checkedItems: action.items
      };
    default:
      return state;
  }
};
