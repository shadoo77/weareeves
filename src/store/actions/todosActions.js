import {
  ACTION_LOADING,
  ACTION_FAILED,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  TOGGLE_DONE,
  MARK_TODOS_AS_DONE,
  MARK_TODOS_AS_NOT_DONE
} from "./types";

export const set_loading = () => {
  return {
    type: ACTION_LOADING
  };
};

export const set_fail = err => {
  return {
    type: ACTION_FAILED,
    error: err
  };
};

// Add new todo
export const addTodo = item => dispatch => {
  try {
    dispatch(set_loading());
    dispatch({
      type: ADD_TODO,
      item
    });
  } catch (err) {
    dispatch(set_fail(err));
  }
};

// Update todo
export const updateTodo = (todoId, newItem) => dispatch => {
  try {
    dispatch(set_loading());
    dispatch({
      type: UPDATE_TODO,
      payload: { todoId, newItem }
    });
  } catch (err) {
    dispatch(set_fail(err));
  }
};

// Delete todo
export const deleteTodos = todoIds => dispatch => {
  try {
    dispatch(set_loading());
    dispatch({
      type: DELETE_TODO,
      todoIds
    });
  } catch (err) {
    dispatch(set_fail(err));
  }
};

// Mark todos as done
export const toggleTodoDone = todoId => dispatch => {
  dispatch({
    type: TOGGLE_DONE,
    todoId
  });
};

// Mark todos as done
export const markTodosAsDone = todoIds => dispatch => {
  dispatch({
    type: MARK_TODOS_AS_DONE,
    todoIds
  });
};

// Mark todos as not done
export const markTodosAsNotDone = todoIds => dispatch => {
  dispatch({
    type: MARK_TODOS_AS_NOT_DONE,
    todoIds
  });
};
