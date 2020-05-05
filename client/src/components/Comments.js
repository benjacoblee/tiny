import React, { useEffect } from "react";
import Moment from "react-moment";

const Comments = (props) => {
  const renderComments = () => {
    if (props.comments.length > 0) {
      return props.comments.map((comment) => {
        return (
          <div key={comment._id}>
            <img
              className="mr-2"
              src={comment.postedBy.avatar}
              style={{ maxWidth: "20px" }}
            ></img>
            <span className="mb-0">
              {comment.postedBy.fullName
                ? comment.postedBy.fullName
                : comment.postedBy.email}
              <span className="ml-1">
                <small className="text-muted">
                  <Moment format="DD MMM YYYY">{comment.dateCreated}</Moment>
                </small>
              </span>
            </span>

            <p className="mt-2">{comment.text}</p>
          </div>
        );
      });
    }
    return null;
  };

  useEffect(() => {}, [props.comments]);

  return <div className="mt-3">{renderComments()}</div>;
};

export default Comments;
