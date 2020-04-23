import React, { Fragment } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Fragment>
      <Form className="login-form">
        <h1 className="text-center mb-2">Login</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group>
          <Form.Text className="text-muted">
            Don't have an account? <Link to="/register">Sign up</Link>
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default Login;
