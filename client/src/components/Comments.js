import React, { useEffect, useRef } from "react";

const Comments = (props) => {
  const renderComments = () => {
    if (props.comments.length > 0) {
      console.log("HAPPENING")
      return props.comments.map((comment) => {
        return (
          <div>
            <p>
              {comment.postedBy.name
                ? comment.postedBy.name
                : comment.postedBy.email}
            </p>
            <p key={comment._id}>{comment.text}</p>
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
