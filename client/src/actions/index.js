import axios from "axios";
import { AUTH_USER, REGISTER_USER, SUBMIT_ARTICLE } from "./types";

export const authUser = (loginDetails) => async (dispatch) => {
  try {
    let response = await axios.post("/api/auth", loginDetails);
    dispatch({
      type: AUTH_USER,
      payload: {
        alerts: [{ msg: "Successfully logged in!" }],
        variant: "success",
        token: response.data
      }
    });
    const jwtToken = JSON.stringify(response.data);
    sessionStorage.setItem("jwtToken", jwtToken);
    console.log(sessionStorage.getItem("jwtToken"));
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: AUTH_USER,
      payload: { alerts: err.response.data.errors, variant: "danger" }
    });

    setTimeout(() => {
      dispatch({
        type: AUTH_USER,
        payload: ""
      });
    }, 5000);
  }

  // return {
  //   type: AUTH_USER,
  //   payload: loginDetails
  // };
};

export const registerUser = (loginDetails) => async (dispatch) => {
  try {
    let response = await axios.post("/api/users", loginDetails);
    dispatch({
      type: REGISTER_USER,
      payload: {
        alerts: [{ msg: "Successfully registered!" }],
        variant: "success",
        token: response.data
      }
    }); // get token, keep somewhere
    sessionStorage.setItem("jwtToken", response.data);
  } catch (err) {
    console.log(err);
    dispatch({
      type: REGISTER_USER,
      payload: { alerts: err.response.data.errors, variant: "danger" }
    });

    setTimeout(() => {
      dispatch({
        type: REGISTER_USER,
        payload: ""
      });
    }, 5000);
  }

  // return {
  //   type: AUTH_USER,
  //   payload: loginDetails
  // };
};

export const submitArticle = (articleDetails) => async (dispatch) => {
  console.log(sessionStorage.getItem("jwtToken"));
  const token = JSON.parse(sessionStorage.getItem("jwtToken")).token;
  let response = await axios.post("/api/articles", articleDetails, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token
    }
  });

  console.log(response);
};
