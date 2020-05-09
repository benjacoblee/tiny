import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Form, Button, Card } from "react-bootstrap";
import { FacebookProvider, ShareButton } from "react-facebook";
import * as actions from "../actions";
import Comments from "./Comments";

const Article = (props) => {
  const { id } = props.match.params;
  const token = sessionStorage.getItem("jwtToken");
  const [formData, updateFormData] = useState({
    text: ""
  });
  const commentsEndRef = useRef(null);

  useEffect(() => {
    props.fetchArticle(id);
    props.fetchUser(token); // take auth id and compare to postedby id
  }, []);

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    const articleID = id;
    e.preventDefault();
    props.postComment(articleID, formData);
    updateFormData({ text: "" });
    scrollToBottom();
    // post formData
    // need action to handle post comment
  };

  const scrollToBottom = () => {
    commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const renderBio = () => {
    const { avatar, fullName, email, bio } = props.article.postedBy;
    return (
      <div className="mt-3">
        <Card>
          <Card.Body>
            <div className="row">
              <div className="col-3">
                {avatar ? (
                  <img src={avatar} style={{ maxWidth: "100%" }}></img>
                ) : null}
              </div>
              <div className="col-9">
                <Card.Title>{fullName ? fullName : email}</Card.Title>
                <Card.Text>{bio ? bio : null}</Card.Text>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  };

  if (props.article.title) {
    const isAuthor = props.article.postedBy._id === props.auth._id;
    let {
      title,
      postedBy,
      dateCreated,
      dateEdited,
      body,
      image
    } = props.article;

    return (
      <div>
        <div className="mt-3">
          <h5>
            {title}{" "}
            {isAuthor ? (
              <small>
                <Link to={`/articles/${props.article._id}/edit`}>
                  Edit Article
                </Link>
                <Link
                  to={`/articles/${props.article._id}/delete`}
                  onClick={async (e) => {
                    e.preventDefault();
                    await props.deleteArticle(props.article._id).then(() => {
                      props.history.push("/");
                    });
                  }}
                >
                  {" "}
                  Delete Article
                </Link>
              </small>
            ) : null}
          </h5>
          <h6>
            {postedBy.fullName ? postedBy.fullName : postedBy.email}{" "}
            <small>
              {dateEdited ? "edited " : null}
              <Moment format="DD MMM YYYY">
                {dateEdited ? dateEdited : dateCreated}
              </Moment>
            </small>{" "}
          </h6>
          {image ? <img style={{ maxWidth: "100%" }} src={image}></img> : null}
          <p className="mt-3">{body}</p>
          <FacebookProvider appId="482577102470210">
            <ShareButton href={window.location.href} quote={title}>
              Share
            </ShareButton>
          </FacebookProvider>
          <hr />
          {renderBio()}

          {token ? (
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label style={{ textDecoration: "underline" }}>
                  Join the discussion!
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          ) : null}
        </div>
        <Comments comments={props.article.comments} />
        <div ref={commentsEndRef}></div>
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
