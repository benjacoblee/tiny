import axios from "axios";
import {
  ALERT,
  AUTH_USER,
  REGISTER_USER,
  FETCH_USER,
  FETCH_DASHBOARD_DETAILS,
  SUBMIT_ARTICLE,
  EDIT_ARTICLE,
  FETCH_ARTICLE,
  FETCH_ARTICLES,
  LOGOUT_USER,
  POST_COMMENT,
  ADVANCE_PAGE,
  SEARCH_ARTICLES
} from "./types";

const clearAlert = (type) => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type,
      payload: ""
    });
  }, 1000);
};

export const authUser = (loginDetails) => async (dispatch) => {
  try {
    let response = await axios.post("/api/auth", loginDetails);

    dispatch({
      type: ALERT,
      payload: {
        message: [{ msg: "Successfully logged in!" }],
        variant: "success"
      }
    });

    clearAlert(ALERT)(dispatch);

    dispatch({
      type: AUTH_USER,
      payload: {
        token: response.data
      }
    });
  } catch (err) {
    dispatch({
      type: ALERT,
      payload: { message: err.response.data.errors, variant: "danger" }
    });

    clearAlert(ALERT)(dispatch);
  }

  // return {
  //   type: AUTH_USER,
  //   payload: loginDetails
  // };
};

export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: ALERT,
    payload: {
      message: [{ msg: "Successfully logged out!" }],
      variant: "success"
    }
  });

  clearAlert(ALERT)(dispatch);

  dispatch({
    type: LOGOUT_USER,
    payload: {
      token: null
    }
  });
};

export const registerUser = (registrationDetails) => async (dispatch) => {
  if (registrationDetails.password !== registrationDetails.password2) {
    dispatch({
      type: ALERT,
      payload: {
        message: [{ msg: "Passwords must match!" }],
        variant: "warning"
      }
    });
    return clearAlert(ALERT)(dispatch);
  }

  try {
    let response = await axios.post("/api/users", registrationDetails);

    dispatch({
      type: ALERT,
      payload: {
        message: [{ msg: "Successfully registered!" }],
        variant: "success"
      }
    });

    clearAlert(ALERT)(dispatch);

    dispatch({
      type: REGISTER_USER,
      payload: {
        token: response.data
      }
    }); // get token, keep somewhere
  } catch (err) {
    dispatch({
      type: ALERT,
      payload: { message: err.response.data.errors, variant: "danger" }
    });

    clearAlert(ALERT)(dispatch);
  }

  // return {
  //   type: AUTH_USER,
  //   payload: loginDetails
  // };
};

export const fetchUser = (token) => async (dispatch) => {
  let response = await axios.get("/api/auth", {
    headers: {
      "x-auth-token": token
    }
  });
  dispatch({
    type: FETCH_USER,
    payload: response.data
  });
};

export const submitArticle = (articleDetails) => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");

  dispatch({
    type: ALERT,
    payload: {
      message: [{ msg: "Submitting article, please wait..." }],
      variant: "warning"
    }
  });

  if (articleDetails.file) {
    const contentType = articleDetails.file.type;
    const generatePutUrl = "/generate-put-url";
    let options = {
      params: {
        Key: articleDetails.file.name,
        ContentType: contentType
      },
      headers: {
        "Content-Type": contentType
      }
    };

    try {
      let putUrlResponse = await axios.get(generatePutUrl, options);
      const {
        data: { putURL }
      } = putUrlResponse;

      await axios.put(putURL, articleDetails.file, options);

      articleDetails.image = `https://tiny-blog-app.s3.ap-southeast-1.amazonaws.com/${articleDetails.file.name}`;

      let response = await axios.post("/api/articles", articleDetails, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token
        }
      });

      clearAlert(ALERT)(dispatch);

      return dispatch({
        type: SUBMIT_ARTICLE,
        payload: response.data._id
      });
    } catch (err) {
      console.error(err);
    }
  } else {
    let response = await axios.post("/api/articles", articleDetails, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    });

    clearAlert(ALERT)(dispatch);

    return dispatch({
      type: SUBMIT_ARTICLE,
      payload: response.data._id
    });
  }
};

export const editArticle = (articleDetails) => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");

  dispatch({
    type: ALERT,
    payload: {
      message: [{ msg: "Submitting edited article, please wait..." }],
      variant: "warning"
    }
  });

  let response = await axios.patch(
    `/api/articles/${articleDetails.id}`,
    articleDetails,
    {
      headers: {
        "x-auth-token": token
      }
    }
  );

  clearAlert(ALERT)(dispatch);

  dispatch({
    type: EDIT_ARTICLE,
    payload: response.data._id
  });
};

export const deleteArticle = (id) => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");

  try {
    let response = await axios.delete(`/api/articles/${id}`, {
      headers: {
        "x-auth-token": token
      }
    });
    if (response) {
      dispatch({
        type: ALERT,
        payload: {
          message: [{ msg: "Successfully deleted article!" }],
          variant: "success"
        }
      });

      clearAlert(ALERT)(dispatch);
    }
  } catch (err) {
    console.error(err);
  }
};

export const fetchArticle = (id) => async (dispatch) => {
  let response = await axios.get(`/api/articles/${id}`);
  dispatch({
    type: FETCH_ARTICLE,
    payload: response.data
  });
};

export const fetchArticles = (page) => async (dispatch) => {
  try {
    let response = await axios.get(`/api/articles?page=${page}`);
    dispatch({
      type: FETCH_ARTICLES,
      payload: response.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const postComment = (articleID, commentData) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("jwtToken");
    let response = await axios.post(
      `/api/articles/${articleID}/comments`,
      commentData,
      {
        headers: {
          "x-auth-token": token
        }
      }
    );

    dispatch({
      type: POST_COMMENT,
      payload: response.data
    });
  } catch (err) {}
};

export const advancePage = () => {
  return {
    type: ADVANCE_PAGE
  };
};

export const fetchDashboardDetails = () => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");
  try {
    const response = await axios.get("/api/auth/dashboard", {
      headers: {
        "x-auth-token": token
      }
    });
    dispatch({ type: FETCH_DASHBOARD_DETAILS, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const submitBio = (userID, bioDetails) => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");
  dispatch({
    type: ALERT,
    payload: {
      message: [{ msg: "Submitting bio, please wait..." }],
      variant: "warning"
    }
  });

  if (bioDetails.file) {
    const contentType = bioDetails.file.type;
    const generatePutUrl = "/generate-put-url";
    let options = {
      params: {
        Key: bioDetails.file.name,
        ContentType: contentType
      },
      headers: {
        "Content-Type": contentType
      }
    };

    try {
      let putUrlResponse = await axios.get(generatePutUrl, options);
      const {
        data: { putURL }
      } = putUrlResponse;

      await axios.put(putURL, bioDetails.file, options);

      bioDetails.image = `https://tiny-blog-app.s3.ap-southeast-1.amazonaws.com/${bioDetails.file.name}`;

      let response = await axios.put(`/api/users/${userID}`, bioDetails, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token
        }
      });

      clearAlert(ALERT)(dispatch);
    } catch (err) {
      console.error(err);
    }
  } else {
    let response = await axios.put(`/api/users/${userID}`, bioDetails, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    });

    clearAlert(ALERT)(dispatch);
  }
};

export const searchArticles = (query) => async (dispatch) => {
  dispatch({
    type: ALERT,
    payload: {
      message: [{ msg: "Searching, please wait..." }],
      variant: "warning"
    }
  });
  clearAlert(ALERT)(dispatch);
  const response = await axios.get(`/api/articles?q=${query}`);
  dispatch({
    type: SEARCH_ARTICLES,
    payload: response.data
  });
};
