import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

const Article = (props) => {
  const { id } = props.match.params;
  useEffect(() => {
    props.fetchArticle(id);
  }, []);

  if (props.article.title) {
    let { title, postedBy, dateCreated, body } = props.article;
    return (
      <div className="mt-3">
        <h5>{title}</h5>
        <h6>
          Posted by: {postedBy.name} on <small>{dateCreated}</small>{" "}
        </h6>
        <p>{body}</p>
      </div>
    );
  }

  return <div>Loading</div>;
};

const mapStateToProps = (state) => {
  return { article: state.article };
};

export default connect(mapStateToProps, actions)(Article);
