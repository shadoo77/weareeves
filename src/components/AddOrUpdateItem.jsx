import React, { useState } from "react";
import PropTypes from "prop-types";
import uuidv4 from "uuid/v4";
// Redux store
import { connect } from "react-redux";
import { addTodo, updateTodo } from "../store/actions/todosActions";
import { handleSelectedTodos } from "../store/actions/helperActions";
// Material UI
import {
  List,
  ListItem,
  Tooltip,
  TextField,
  IconButton,
  Fab,
  Box
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

function AddOrUpdateItem(props) {
  const { action, item, toggleEditMode } = props;
  const classes = useStyles();
  const [value, setValue] = useState(action === "add" ? "" : item.task);
  const [error, setError] = useState("");

  // Handle change
  const handleChange = e => {
    setValue(e.target.value);
    setError("");
  };

  // Handle submit
  const handleSubmit = e => {
    e.preventDefault();
    const regex = /^[^%]{3,}$/g;
    const isValid = value.match(regex);
    if (!isValid) {
      setError("The string should be more than 3 letters !");
      return;
    }
    const newItem = { _id: uuidv4(), task: value, done: false };
    props.addTodo(newItem);
    setValue("");
  };

  // Handle submit
  const handleUpdate = () => {
    const regex = /^[^%]{3,}$/g;
    const isValid = value.match(regex);
    if (!isValid) {
      setError("The string should be more than 3 letters !");
      return;
    }
    const newItem = { _id: item._id, task: value, done: item.done };
    props.updateTodo(item._id, newItem);
    toggleEditMode();
  };

  const TextInputField = () => (
    <TextField
      error={error ? true : false}
      value={value}
      label={action === "add" ? "Add todo item" : "Update todo item"}
      variant="standard"
      onChange={handleChange}
      helperText={error}
      placeholder="Enter a task here.."
      fullWidth
    />
  );

  return (
    <List>
      <ListItem dense>
        <Box display="flex" flexWrap="nowrap" width={1}>
          <Box flexGrow={1} alignItems="flex-start" pb={2}>
            {TextInputField()}
          </Box>
          <Box ml={1} alignItems="flex-end">
            {action === "add" ? (
              <Tooltip title="Add todo">
                <Fab
                  variant="extended"
                  size="small"
                  color="primary"
                  aria-label="add"
                  className={classes.margin}
                  onClick={handleSubmit}
                >
                  <AddCircleOutlineIcon className={classes.extendedIcon} />
                  Add
                </Fab>
              </Tooltip>
            ) : (
              <>
                <Tooltip title="Confirm">
                  <IconButton
                    edge="end"
                    aria-label="confirm"
                    onClick={() => handleUpdate()}
                  >
                    <CheckIcon style={{ color: "green" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cancel">
                  <IconButton
                    edge="end"
                    aria-label="cancel"
                    onClick={() => toggleEditMode()}
                  >
                    <CancelIcon style={{ color: "red" }} />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
        </Box>
      </ListItem>
    </List>
  );
}

AddOrUpdateItem.propTypes = {
  addTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  handleSelectedTodos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  //todos: state.todos,
});

export default connect(mapStateToProps, {
  addTodo,
  updateTodo,
  handleSelectedTodos
})(AddOrUpdateItem);
