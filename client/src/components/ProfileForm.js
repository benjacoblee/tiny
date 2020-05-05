import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../actions";

const bioPlaceholder =
  "Mark is a writer at Tiny, where Mark creates compelling articles about software engineering. When not traveling, Mark enjoys practicing for marathons, going on hikes, and planning for the next adventure with the wife and kids.";

const ProfileForm = (props) => {
  const token = sessionStorage.getItem("jwtToken");
  useEffect(() => {
    if (!token) {
      return props.history.push("/");
    }
    props.fetchUser(token);
  }, []);

  const [formData, updateFormData] = useState({
    name: "",
    bio: ""
  });

  const { name, bio } = formData;

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mt-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={handleChange}
            placeholder={props.auth.name ? props.auth.name : "Mark"}
            value={name}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            onChange={handleChange}
            placeholder={props.auth.bio ? props.auth.bio : bioPlaceholder}
            value={bio}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, actions)(ProfileForm);
