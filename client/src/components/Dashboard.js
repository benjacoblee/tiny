import React, { useEffect } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = ({ dashboard, fetchDashboardDetails }) => {
  useEffect(() => {
    fetchDashboardDetails();
  }, []);

  const { articles, numberOfComments, user } = dashboard;

  const renderArticles = () => {
    if (articles.length > 0) {
      return articles.map((article) => {
        return (
          <Link className="text-center" to={`/articles/${article._id}`}>
            {article.title}
          </Link>
        );
      });
    }
  };

  const renderProfile = () => {
    if (user) {
      if (!user.name && !user.bio) {
        return (
          <Link className="text-center" to="/profile/edit">
            Add Profile Details
          </Link>
        );
      }
    }
  };

  return (
    <div style={{ marginTop: "20px" }} className="row">
      <div className="col-5">
        <h6 className="text-center">My Articles</h6>
        {articles ? renderArticles() : null}
      </div>
      <div className="col-2">
        <h6 className="text-center">Comments</h6>
        <p className="text-center">{numberOfComments}</p>
      </div>
      <div className="col-5">
        <h6 className="text-center">Profile</h6>
        {renderProfile()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { dashboard: state.dashboard };
};

export default connect(mapStateToProps, actions)(Dashboard);
