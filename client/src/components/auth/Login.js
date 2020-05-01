import React, { useState, useEffect, Fragment } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

const Login = (props) => {
  useEffect(() => {
    if (props.auth.token) {
      return props.history.push("/");
    }
  }, [props.auth]);

  const [formData, updateFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.authUser(formData);
  };

  return (
    <Fragment>
      <Form
        className="login-form"
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <h1 className="text-center mb-2">Login</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => {
              onChange(e);
            }}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              onChange(e);
            }}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Text className="text-muted">
            Don't have an account? <Link to="/register">Sign up!</Link>
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, actions)(Login);
