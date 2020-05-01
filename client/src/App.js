import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import Header from "./components/layout/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ArticleForm from "./components/ArticleForm";
import Alerts from "./components/Alerts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = (props) => {
  let token = sessionStorage.getItem("jwtToken");
  if (!token) {
    token = sessionStorage.setItem(
      "jwtToken",
      JSON.stringify(props.auth.token)
    );
    console.log(token);
  }
  return (
    <Router>
      <div className="App">
        <Header />
        <Alerts alerts={props.auth.alerts} variant={props.auth.variant} />
        <Container>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/articles/new" component={ArticleForm} />
        </Container>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {})(App);
