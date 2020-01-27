import {
  ACTION_LOADING,
  ACTION_FAILED,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  TOGGLE_DONE,
  MARK_TODOS_AS_DONE,
  MARK_TODOS_AS_NOT_DONE
} from "../actions/types";
// Helpers functions
import {
  updateTodo,
  deleteTodos,
  toggleDone,
  markTodosAsDone,
  markTodosAsNotDone
} from "../../utils/helpers";

//////////// test items ///////////
const testItems = [
  { _id: 1, task: "I have to go to Utrecht", done: false },
  { _id: 2, task: "Cleaning up my documents", done: true },
  { _id: 3, task: "Watching tv (football game)", done: false }
];
///////////////////////////////////

const initialState = {
  isLoading: false,
  hasFailed: false,
  items: testItems,
  errorMessage: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_LOADING:
      return {
        ...state,
        isLoading: true,
        hasFailed: false
      };
    case ACTION_FAILED:
      return {
        ...state,
        isLoading: false,
        hasFailed: true,
        errorMessage: action.error
      };
    case ADD_TODO:
      return {
        ...state,
        isLoading: false,
        hasFailed: false,
        items: [...state.items, action.item],
        errorMessage: ""
      };
    case UPDATE_TODO:
      const newData = updateTodo(
        state.items,
        action.payload.todoId,
        action.payload.newItem
      );
      return {
        ...state,
        isLoading: false,
        hasFailed: false,
        items: newData,
        errorMessage: ""
      };
    case DELETE_TODO:
      return {
        ...state,
        isLoading: false,
        hasFailed: false,
        items: deleteTodos(state.items, action.todoIds),
        errorMessage: ""
      };
    case TOGGLE_DONE:
      return {
        ...state,
        isLoading: false,
        hasFailed: false,
        items: toggleDone(state.items, action.todoId),
        errorMessage: ""
      };
    case MARK_TODOS_AS_DONE:
      return {
        ...state,
        isLoading: false,
        hasFailed: false,
        items: markTodosAsDone(state.items, action.todoIds),
        errorMessage: ""
      };
    case MARK_TODOS_AS_NOT_DONE:
      return {
        ...state,
        isLoading: false,
        hasFailed: false,
        items: markTodosAsNotDone(state.items, action.todoIds),
        errorMessage: ""
      };
    default:
      return state;
  }
};
