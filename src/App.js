import React from "react";
import "./App.css";
// Components
import AppBar from "./components/layout/AppBar";
import Todos from "./components/Todos";
// Material UI
import { Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  mainContainer: {
    [theme.breakpoints.down("xs")]: {
      padding: 0
    }
  },
  paperStyle: {
    padding: theme.spacing(3, 0),
    minHeight: "100vh",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0),
      padding: theme.spacing(0)
    }
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <div className="App">
      <Container maxWidth="md" className={classes.mainContainer}>
        <AppBar />
        <Paper square={true} className={classes.paperStyle}>
          <Todos />
        </Paper>
      </Container>
    </div>
  );
};
