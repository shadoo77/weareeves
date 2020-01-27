import { combineReducers } from "redux";
import todosReducer from "./todosReducer";
import helperReducer from "./helperReducer";

export default combineReducers({
  todos: todosReducer,
  helper: helperReducer
});
