import React, { Fragment, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../actions";

const EditArticleForm = ({
  match,
  article,
  history,
  fetchArticle,
  editArticle
}) => {
  const { id } = match.params;
  useEffect(() => {
    fetchArticle(id);
  }, [fetchArticle, history, id, article.id]);
  const token = sessionStorage.getItem("jwtToken");

  if (!token) {
    history.push("/");
  }

  const [formData, updateFormData] = useState({
    id,
    title: "",
    body: "",
    tags: ""
  });

  const { title, body, tags } = formData;

  const handleChange = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editArticle(formData).then(() => {
      history.push(`/articles/${id}`);
    });
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
            placeholder={article.title}
            value={title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            name="tags"
            placeholder={article.tags}
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
            placeholder={article.body}
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

export default connect(mapStateToProps, actions)(EditArticleForm);
