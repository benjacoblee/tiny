import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import * as actions from "./actions";
import Header from "./components/layout/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ArticleForm from "./components/ArticleForm";
import EditArticleForm from "./components/EditArticleForm";
import Articles from "./components/Articles";
import Article from "./components/Article";
import Alerts from "./components/Alerts";
import Logout from "./components/auth/Logout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = (props) => {
  useEffect(() => {
    if (props.auth.token !== null && props.auth.token !== undefined) {
      const { token } = props.auth.token;
      sessionStorage.setItem("jwtToken", token);
    }
  }, [props.auth]);
  return (
    <Router>
      <div className="App">
        <Header />
        <Alerts alerts={props.auth.alerts} variant={props.auth.variant} />
        <Container>
          <Route exact path="/" component={Articles} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Switch>
            <Route exact path="/articles/new" component={ArticleForm} />
            <Route
              exact
              path="/articles/:id/edit"
              component={EditArticleForm}
            />
            <Route exact path="/articles/:id" component={Article} />
          </Switch>
        </Container>
      </div>
      <Route exact path="/logout" component={Logout} />
    </Router>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, actions)(App);
