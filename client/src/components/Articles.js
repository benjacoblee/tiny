import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";

const Articles = (props) => {
  useEffect(() => {
    props.fetchArticles();
    console.log(props.articles);
  }, []);

  const renderArticles = () => {
    if (props.articles.length > 0) {
      return props.articles.map((article) => {
        return (
          <div key={article._id}>
            <Link to={`/articles/${article._id}`}>
              <p>{article.title}</p>
            </Link>
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
