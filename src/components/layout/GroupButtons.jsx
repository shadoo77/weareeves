import React from "react";
import PropTypes from "prop-types";
// Redux store
import { connect } from "react-redux";
import { handleSelectedTodos } from "../../store/actions/helperActions";
import {
  deleteTodos,
  markTodosAsDone,
  markTodosAsNotDone
} from "../../store/actions/todosActions";
// Material UI
import {
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Tooltip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TrashIcon from "@material-ui/icons/DeleteOutline";
import VisibilityIcon from "@material-ui/icons/VisibilityOutlined";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex"
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  buttonStyle: {
    borderColor: "#d0d0d0",
    color: "#818181",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  iconStyle: { fontSize: 19 }
}));

function GroupedButtons(props) {
  const { selectedItems, todosItems } = props;
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleChange = event => {
    setChecked(event.target.checked);
    const tasks =
      todosItems && todosItems.length ? todosItems.map(el => el._id) : [];
    props.handleSelectedTodos(event.target.checked ? tasks : []);
  };

  // Delete todos
  function deleteTasks() {
    props.deleteTodos(selectedItems);
    props.handleSelectedTodos([]);
    setChecked(false);
  }

  // Mark as done for todos
  function markAsDone() {
    props.markTodosAsDone(selectedItems);
    props.handleSelectedTodos([]);
    setChecked(false);
  }

  // Mark as not done
  function markAsNotDone() {
    props.markTodosAsNotDone(selectedItems);
    props.handleSelectedTodos([]);
    setChecked(false);
  }

  return (
    <>
      <div className={classes.container}>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          value="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <div className={classes.buttonGroup}>
          <ButtonGroup
            color="default"
            size="small"
            aria-label="outlined button group"
          >
            <Tooltip title="Delete selected todos">
              <Button className={classes.buttonStyle} onClick={deleteTasks}>
                <TrashIcon className={classes.iconStyle} />
              </Button>
            </Tooltip>
            <Tooltip title="Mark selected todos as done">
              <Button className={classes.buttonStyle} onClick={markAsDone}>
                <DoneOutlineIcon className={classes.iconStyle} />
              </Button>
            </Tooltip>
            <Tooltip title="Mark selected todos as not done">
              <Button className={classes.buttonStyle} onClick={markAsNotDone}>
                <VisibilityIcon className={classes.iconStyle} />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </div>
      </div>
      <Divider />
    </>
  );
}

GroupedButtons.propTypes = {
  helper: PropTypes.object.isRequired,
  deleteTodos: PropTypes.func.isRequired,
  markTodosAsDone: PropTypes.func.isRequired,
  markTodosAsNotDone: PropTypes.func.isRequired,
  handleSelectedTodos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  helper: state.helper
});

export default connect(mapStateToProps, {
  handleSelectedTodos,
  deleteTodos,
  markTodosAsDone,
  markTodosAsNotDone
})(GroupedButtons);
