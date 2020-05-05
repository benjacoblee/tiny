import React, { useEffect } from "react";
import * as actions from "../actions";
import {connect} from "react-redux";

const Dashboard = (props) => {
  useEffect(() => {
    props.fetchDashboardDetails();
  }, []);
  return <div>DASHBOARD</div>;
};

const mapStateToProps = (state) => {
  return { dashboard: state.dashboard };
};

export default connect(mapStateToProps, actions)(Dashboard);
