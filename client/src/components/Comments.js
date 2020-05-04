import React, { useEffect, useRef } from "react";

const Comments = (props) => {
  const renderComments = () => {
    if (props.comments.length > 0) {
      return props.comments.map((comment) => {
        return (
          <div key={comment._id}>
            <p>
              {comment.postedBy.name
                ? comment.postedBy.name
                : comment.postedBy.email}
            </p>
            <p>{comment.text}</p>
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
