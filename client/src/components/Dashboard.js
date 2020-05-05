import React, { useEffect } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = ({ dashboard, fetchDashboardDetails, history }) => {
  const token = sessionStorage.getItem("jwtToken");
  useEffect(() => {
    if (!token) {
      history.push("/");
    }
    fetchDashboardDetails();
  }, []);

  const { articles, numberOfComments, user } = dashboard;

  const renderArticles = () => {
    if (articles.length > 0) {
      return articles.map((article) => {
        return (
          <Link
            key={article._id}
            className="text-center"
            to={`/articles/${article._id}`}
          >
            {article.title}
          </Link>
        );
      });
    }
  };

  const renderProfile = () => {
    if (user) {
      return (
        <div className="row">
          <div className="col-6">
            <img src={user.avatar} style={{ maxWidth: "100%" }} />
          </div>
          <div className="col-6">
            {user.name ? <p>{user.name}</p> : null}
            {user.bio ? <p>{user.bio}</p> : null}
          </div>
          <Link className="mx-auto" to="/profile/edit">
            Edit Profile Details
          </Link>
        </div>
      );
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
