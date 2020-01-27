import React, { useState } from "react";
import PropTypes from "prop-types";
// Redux store
import { connect } from "react-redux";
import { deleteTodos, toggleTodoDone } from "../store/actions/todosActions";
import { handleSelectedTodos } from "../store/actions/helperActions";
// Material UI
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Tooltip
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
// Components
import AddOrUpdateItem from "./AddOrUpdateItem";

const Todo = props => {
  const [editMode, setEditMode] = useState(false);
  const { item } = props;
  const { checkedItems, searchText } = props.helper;

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(prevActiveStep => !prevActiveStep);
  };

  // Handle check box
  const handleToggle = value => e => {
    e.stopPropagation();
    const currentIndex = checkedItems.indexOf(value);
    const newChecked = [...checkedItems];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    props.handleSelectedTodos(newChecked);
  };

  // Mark highlights
  const markHighlightsTxt = item => {
    const re = new RegExp(searchText, "gi");
    const part = item.task.split(re, 2);
    return (
      <div style={{ textDecoration: item.done ? "line-through" : "none" }}>
        {searchText.length ? (
          <div>
            {part[0]}
            <span style={{ backgroundColor: "yellow" }}>{searchText}</span>
            {part[1]}
          </div>
        ) : (
          item.task
        )}
      </div>
    );
  };

  return editMode ? (
    <AddOrUpdateItem
      action="edit"
      item={item}
      toggleEditMode={toggleEditMode}
    />
  ) : (
    <ListItem
      dense
      button
      onClick={() => props.toggleTodoDone(item._id)}
      style={{ backgroundColor: item.done && "#f2e7da" }}
    >
      <Checkbox
        edge="start"
        checked={checkedItems.indexOf(item._id) !== -1}
        disableRipple
        onClick={handleToggle(item._id)}
      />
      <ListItemText id={item._id} primary={markHighlightsTxt(item)} />
      <ListItemSecondaryAction>
        <Tooltip title="Edit todo">
          <IconButton edge="end" aria-label="edit" onClick={toggleEditMode}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete todo">
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => props.deleteTodos([item._id])}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

Todo.propTypes = {
  helper: PropTypes.object.isRequired,
  deleteTodos: PropTypes.func.isRequired,
  toggleTodoDone: PropTypes.func.isRequired,
  handleSelectedTodos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  helper: state.helper
});

export default connect(mapStateToProps, {
  deleteTodos,
  handleSelectedTodos,
  toggleTodoDone
})(Todo);
