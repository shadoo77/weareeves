import { CHECKED_ITEMS, CHANGE_SEARCH_TEXT } from "./types";

export const handleChangeSearchBox = value => dispatch => {
  dispatch({
    type: CHANGE_SEARCH_TEXT,
    value
  });
};

export const handleSelectedTodos = todosIds => dispatch => {
  dispatch({
    type: CHECKED_ITEMS,
    items: todosIds
  });
};
