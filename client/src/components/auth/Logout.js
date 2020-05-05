import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router";
import * as actions from "../../actions"

class LogoutPage extends Component {
  componentDidMount() {
    sessionStorage.removeItem("jwtToken");
    this.props.dispatch(actions.logoutUser());
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default withRouter(connect()(LogoutPage));
