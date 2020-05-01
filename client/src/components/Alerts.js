import React, { Fragment } from "react";
import { Alert } from "react-bootstrap";

const Errors = (props) => {
  const renderErrors = () => {
    if (props.alerts) {
      return props.alerts.map((alert, index) => {
        return (
          <Alert key={index} variant={props.variant}>
            {alert.msg}
          </Alert>
        );
      });
    }
  };
  return <Fragment>{renderErrors()}</Fragment>;
};

export default Errors;
