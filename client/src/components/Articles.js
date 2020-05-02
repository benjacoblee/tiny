import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

const Articles = (props) => {
  useEffect(() => {
    props.fetchArticles();
  }, []);

  const renderArticles = () => {
    if (props.articles.length > 0) {
      return props.articles.map((article) => {
        return (
          <div>
            <a href={`/articles/${article._id}`}>
              <p>{article.title}</p>
            </a>
          </div>
        );
      });
    }
    return <p>Spinner</p>;
  };
  return <Fragment>{renderArticles()}</Fragment>;
};

const mapStateToProps = (state) => {
  return { articles: state.articles };
};

export default connect(mapStateToProps, actions)(Articles);