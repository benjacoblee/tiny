import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import * as actions from "./actions";
import Header from "./components/layout/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashboard";
import ProfileForm from "./components/ProfileForm";
import ArticleForm from "./components/ArticleForm";
import EditArticleForm from "./components/EditArticleForm";
import Articles from "./components/Articles";
import Article from "./components/Article";
import ArticlesResult from "./components/ArticlesResult";
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
        <Route path="/" component={Header} />
        <Alerts alerts={props.alerts.message} variant={props.alerts.variant} />
        <Container>
          <Route exact path="/" component={Articles} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/profile/edit" component={ProfileForm} />
          <Switch>
            <Route exact path="/articles/new" component={ArticleForm} />
            <Route
              exact
              path="/articles/:id/edit"
              component={EditArticleForm}
            />
            <Route exact path="/articles/:id" component={Article} />
            <Route exact path="/articles" component={ArticlesResult} />
          </Switch>
        </Container>
      </div>
      <Route exact path="/logout" component={Logout} />
    </Router>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth, alerts: state.alerts };
};

export default connect(mapStateToProps, actions)(App);
