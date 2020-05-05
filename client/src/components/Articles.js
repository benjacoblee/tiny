import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import Moment from "react-moment";

const Articles = ({ fetchArticles, advancePage, page, articles }) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchArticles(page);
    advancePage();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchArticles(page);
    advancePage();
    setIsFetching(false);
  }, [isFetching]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setIsFetching(true);
  };

  const truncateBody = (text, id) => {
    if (text.length > 500) {
      return (
        <div>
          <p>
            {text.substring(0, 497)} <Link to={`/articles/${id}`}>...more</Link>
          </p>
        </div>
      );
    }
    return (
      <div>
        <p>{text}</p>
        <Link to={`/articles/${id}`}>Read more</Link>
      </div>
    );
  };

  const renderReadingSpeed = (text) => {
    const length = text.split(" ").length;
    const averageReadingTime = Math.round(length / 225);
    return averageReadingTime === 0 ? 1 : averageReadingTime;
  };

  const renderArticles = () => {
    if (articles.length > 0) {
      return articles.map((article) => {
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
                  {article.postedBy.name
                    ? article.postedBy.name
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
    return (
      <Spinner className="mt-3 mx-auto" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  };

  return <Fragment>{renderArticles()}</Fragment>;
};

const mapStateToProps = (state) => {
  return { articles: state.articles, page: state.page };
};

export default connect(mapStateToProps, actions)(Articles);
