import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../actions";

const ArticleForm = (props) => {
  const [formData, updateFormData] = useState({
    title: "",
    body: "",
    tags: ""
  });

  const { title, body, tags } = formData;

  const handleChange = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitArticle(formData);
  };

  return (
    <Fragment>
      <Form className="mt-3" onSubmit={handleSubmit}>
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

export default connect(null, actions)(ArticleForm);
