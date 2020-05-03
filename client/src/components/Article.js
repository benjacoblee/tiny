import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import * as actions from "../actions";

const Article = (props) => {
  const { id } = props.match.params;
  useEffect(() => {
    props.fetchArticle(id);
    const token = sessionStorage.getItem("jwtToken");
    props.fetchUser(token); // take auth id and compare to postedby id
  }, []);

  if (props.article.title) {
    const isAuthor = props.article.postedBy._id === props.auth._id;
    let { title, postedBy, dateCreated, dateEdited, body } = props.article;
    return (
      <div>
        <div className="mt-3">
          <h5>{title}</h5>
          <h6>
            {postedBy.name ? postedBy.name : postedBy.email }{" "}
            <small>
              {dateEdited ? "edited " : null}
              <Moment format="DD MMM YYYY">
                {dateEdited ? dateEdited : dateCreated}
              </Moment>
            </small>{" "}
          </h6>
          <p>{body}</p>
          {isAuthor ? (
            <Link to={`/articles/${props.article._id}/edit`}>Edit Article</Link>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <Spinner className="mt-3 mx-auto" animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

const mapStateToProps = (state) => {
  return { article: state.article, auth: state.auth };
};

export default connect(mapStateToProps, actions)(Article);
