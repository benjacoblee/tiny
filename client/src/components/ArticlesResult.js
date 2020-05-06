import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import queryString from "query-string";
import * as actions from "../actions";

const ArticlesResult = (props) => {
  useEffect(() => {
    if (!(props.articles.length > 0)) {
      props.searchArticles(queryText);
    }
  }, []);

  const truncateBody = (text, id) => {
    if (text.length > 500) {
      return (
        <div className="mt-3">
          <p>
            {text.substring(0, 497)} <Link to={`/articles/${id}`}>...more</Link>
          </p>
        </div>
      );
    }
    return (
      <div className="mt-3">
        <p>{text}</p>
        <Link to={`/articles/${id}`}>Go to article</Link>
      </div>
    );
  };

  const renderReadingSpeed = (text) => {
    const length = text.split(" ").length;
    const averageReadingTime = Math.round(length / 225);
    return averageReadingTime === 0 ? 1 : averageReadingTime;
  };

  let queryText = queryString.parse(props.location.search).q;
  const renderResults = () => {
    console.log(props.articles);
    if (props.articles.length > 0) {
      console.log(props.articles);
      return props.articles.map((article) => {
        return (
          <Card key={article._id} className="my-3">
            <Card.Body>
              <Card.Title>
                {article.title}{" "}
                <small style={{ fontSize: ".6em" }} className="text-muted">
                  {" "}
                  {renderReadingSpeed(article.body)} minute read
                </small>
              </Card.Title>
              <Card.Subtitle className="mb-2">
                <small>
                  {article.postedBy.fullName
                    ? article.postedBy.fullName
                    : article.postedBy.email}{" "}
                  <span className="text-muted">
                    <Moment format="DD MMM YYYY">{article.dateCreated}</Moment>
                  </span>
                </small>
              </Card.Subtitle>
              {article.image ? (
                <img style={{ maxWidth: "100%" }} src={article.image} />
              ) : null}
              {truncateBody(article.body, article._id)}
            </Card.Body>
          </Card>
        );
      });
    }
    return <p className="text-center">No results found for {queryText}</p>;
  };
  return (
    <div className="mt-3">
      <h6 className="text-center">Showing results for "{queryText}"</h6>
      {props.articles ? renderResults() : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { articles: state.articles };
};

export default connect(mapStateToProps, actions)(ArticlesResult);
