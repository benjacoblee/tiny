import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import queryString from "query-string";
import * as actions from "../actions";

const ArticlesResult = (props) => {
  useEffect(() => {
    if (!(props.articles.length > 0)) {
      props.searchArticles(queryText);
    }
  }, []);
  let queryText = queryString.parse(props.location.search).q;
  const renderResults = () => {
    if (props.articles.length > 0) {
      return props.articles.map((article) => {
        return (
          <p key={article._id} className="text-center">
            <Link to={`/articles/${article._id}`}>{article.title}</Link>
          </p>
        );
      });
    }
    return <p className="text-center">No results found for {queryText}</p>;
  };
  return (
    <div className="mt-3">
      <h6 className="text-center">Showing results for "{queryText}"</h6>
      {renderResults()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { articles: state.articles };
};

export default connect(mapStateToProps, actions)(ArticlesResult);
