import React, { Fragment } from "react";
import { Alert } from "react-bootstrap";

const Alerts = (props) => {
  const renderAlerts = () => {
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
  return <Fragment>{renderAlerts()}</Fragment>;
};

export default Alerts;
