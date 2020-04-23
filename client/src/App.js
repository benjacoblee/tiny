import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/layout/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Container>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Container>
      </div>
    </Router>
  );
};

export default App;
