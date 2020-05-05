import React, { useEffect, useState, createRef } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../actions";

const bioPlaceholder =
  "Mark is a writer at Tiny, where Mark creates compelling articles about software engineering. When not traveling, Mark enjoys practicing for marathons, going on hikes, and planning for the next adventure with the wife and kids.";

const ProfileForm = (props) => {
  const token = sessionStorage.getItem("jwtToken");
  const fileInput = createRef();

  useEffect(() => {
    if (!token) {
      return props.history.push("/");
    }
    props.fetchUser(token);
  }, []);

  const [formData, updateFormData] = useState({
    fullName: "",
    bio: ""
  });

  const handleChange = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = props.auth._id;
    formData.file = fileInput.current.files[0];
    await props.submitBio(userID, formData).then(() => {
      props.history.push(`/dashboard`);
    });
  };

  return (
    <div className="mt-3">
      <Form encType="multipart/form-data" onSubmit={handleSubmit}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            onChange={handleChange}
            placeholder={props.auth.fullName ? props.auth.fullName : "Mark"}
            value={formData.fullName}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>
            Avatar <small className="text-muted">Optional</small>
          </Form.Label>
          <p>
            <input
              type="file"
              name="fileName"
              accept="image/*"
              ref={fileInput}
            />
          </p>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            name="bio"
            placeholder={props.auth.bio ? props.auth.bio : bioPlaceholder}
            onChange={handleChange}
            value={formData.bio}
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
