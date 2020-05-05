import React, { Fragment, useState, useEffect, createRef } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../actions";

const ArticleForm = (props) => {
  const fileInput = createRef();

  useEffect(() => {
    if (props.article.id) {
      props.history.push(`/articles/${props.article.id}`);
    }
  }, [props.article, props.history]);
  const token = sessionStorage.getItem("jwtToken");

  if (!token) {
    props.history.push("/");
  }

  const [formData, updateFormData] = useState({
    title: "",
    body: "",
    tags: ""
  });

  const { title, body, tags } = formData;

  console.log(formData);

  const handleChange = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.file = fileInput.current.files[0];
    props.submitArticle(formData);
  };

  return (
    <Fragment>
      <Form
        encType="multipart/form-data"
        className="mt-3"
        onSubmit={handleSubmit}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            required
            value={title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            name="tags"
            value={tags}
            onChange={handleChange}
          />
          <Form.Text>Please provide comma separated values!</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Image Upload</Form.Label>
          <input type="file" name="fileName" accept="image/*" ref={fileInput} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows="10"
            name="body"
            required
            value={body}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { article: state.article };
};

export default connect(mapStateToProps, actions)(ArticleForm);
