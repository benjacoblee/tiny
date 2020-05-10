import React, { useEffect } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

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
          <ListGroup.Item key={article._id}>
            <Link
              key={article._id}
              className="text-center"
              to={`/articles/${article._id}`}
            >
              {article.title}
            </Link>
          </ListGroup.Item>
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
            {user.fullName ? <p>{user.fullName}</p> : null}
            {user.bio ? <p>{user.bio}</p> : null}
            <Link className="mx-auto" to="/profile/edit">
              Edit Profile Details
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <div style={{ marginTop: "20px" }} className="row">
      <div className="col-6">
        <Card>
          <Card.Body>
            <Card.Title>
              <h6 className="text-center">My Articles</h6>
            </Card.Title>
            <ListGroup variant="flush">
              {articles ? renderArticles() : null}
            </ListGroup>
          </Card.Body>
        </Card>
        <Card className="mt-1">
          <Card.Body>
            <Card.Title>
              <h6 className="text-center">Number of Comments</h6>
            </Card.Title>
            <Card.Text className="text-center">
              {dashboard.numberOfComments}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="col-6">
        <Card>
          <Card.Body>
            <h6 className="text-center">Profile</h6>
            {renderProfile()}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { dashboard: state.dashboard };
};

export default connect(mapStateToProps, actions)(Dashboard);
