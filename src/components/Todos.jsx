import React from "react";
import PropTypes from "prop-types";
// Redux store
import { connect } from "react-redux";
// Utils
import { searchFilter } from "../utils/helpers";
// Material UI
import { Grid, List, Divider, Button, Box } from "@material-ui/core";
// Components
import GroupButtons from "./layout/GroupButtons";
import Todo from "./Todo";
import AddOrUpdateTodo from "./AddOrUpdateItem";

const Todos = props => {
  const [showItems, setShowItems] = React.useState({
    all: true,
    active: false,
    completed: false
  });

  const toggleShowItems = method => {
    if (method === "all") {
      setShowItems({
        ...showItems,
        all: true,
        active: false,
        completed: false
      });
    } else if (method === "active") {
      setShowItems({
        ...showItems,
        all: false,
        active: true,
        completed: false
      });
    } else {
      setShowItems({
        ...showItems,
        all: false,
        active: false,
        completed: true
      });
    }
  };

  // Filter todos
  const todosFilters = () => {
    const { all, active, completed } = showItems;
    const filterBySearchBox = searchFilter(
      props.todos.items,
      props.helper.searchText,
      "task"
    );
    return filterBySearchBox.filter(el =>
      active ? el.done === false : completed ? el.done === true : all && el
    );
  };

  const filteredTodos = todosFilters();

  const renderShowButtons = () => {
    const { all, active, completed } = showItems;
    return (
      <Box display="flex" alignItems="center" style={{ textTransform: "none" }}>
        <Box m={{ xs: 1, sm: 2 }}>
          <h5>Show : </h5>
        </Box>
        <Box m={1}>
          <Button
            variant="contained"
            color="secondary"
            disabled={all}
            onClick={() => toggleShowItems("all")}
          >
            All
          </Button>
        </Box>
        <Box m={1}>
          <Button
            variant="contained"
            color="secondary"
            disabled={active}
            onClick={() => toggleShowItems("active")}
          >
            Active
          </Button>
        </Box>
        <Box m={1}>
          <Button
            variant="contained"
            color="secondary"
            disabled={completed}
            onClick={() => toggleShowItems("completed")}
          >
            Completed
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Grid item xs={12} sm={10} style={{ margin: "auto" }}>
      <h2>todos</h2>
      <GroupButtons
        selectedItems={props.helper.checkedItems}
        todosItems={props.todos.items}
      />
      <List>
        {filteredTodos.length ? (
          filteredTodos.map((item, i) => (
            <React.Fragment key={item._id}>
              <Todo item={item} />
              {i === filteredTodos.length - 1 ? null : <Divider />}
            </React.Fragment>
          ))
        ) : (
          <div>
            <p>There is no tasks!</p>
            <Divider />
          </div>
        )}
      </List>
      <AddOrUpdateTodo action="add" />
      {renderShowButtons()}
    </Grid>
  );
};

Todos.propTypes = {
  todos: PropTypes.object.isRequired,
  helper: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  todos: state.todos,
  helper: state.helper
});

export default connect(mapStateToProps, {})(Todos);
