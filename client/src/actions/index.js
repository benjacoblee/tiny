import axios from "axios";
import {
  AUTH_USER,
  REGISTER_USER,
  FETCH_USER,
  SUBMIT_ARTICLE,
  EDIT_ARTICLE,
  FETCH_ARTICLE,
  FETCH_ARTICLES,
  LOGOUT_USER,
  POST_COMMENT,
  ADVANCE_PAGE
} from "./types";

const clearAlert = (type) => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type,
      payload: ""
    });
  }, 2000);
};

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

    clearAlert(AUTH_USER)(dispatch);
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: AUTH_USER,
      payload: { alerts: err.response.data.errors, variant: "danger" }
    });

    clearAlert(AUTH_USER)(dispatch);
  }

  // return {
  //   type: AUTH_USER,
  //   payload: loginDetails
  // };
};

export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
    payload: {
      alerts: [{ msg: "Successfully logged out!" }],
      variant: "success",
      token: null
    }
  });

  clearAlert(LOGOUT_USER)(dispatch);
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
  } catch (err) {
    console.log(err);
    dispatch({
      type: REGISTER_USER,
      payload: { alerts: err.response.data.errors, variant: "danger" }
    });

    clearAlert(REGISTER_USER)(dispatch);
  }

  // return {
  //   type: AUTH_USER,
  //   payload: loginDetails
  // };
};

export const fetchUser = (token) => async (dispatch) => {
  console.log(token);
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

      console.log(putURL);

      await axios.put(putURL, articleDetails.file, options);

      articleDetails.image = `https://tiny-blog-app.s3.ap-southeast-1.amazonaws.com/${articleDetails.file.name}`;

      let response = await axios.post("/api/articles", articleDetails, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token
        }
      });

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

    return dispatch({
      type: SUBMIT_ARTICLE,
      payload: response.data._id
    });
  }
};

export const editArticle = (articleDetails) => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");
  console.log(articleDetails.id);
  let response = await axios.patch(
    `/api/articles/${articleDetails.id}`,
    articleDetails,
    {
      headers: {
        "x-auth-token": token
      }
    }
  );
  dispatch({
    type: EDIT_ARTICLE,
    payload: response.data._id
  });
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
    console.log(response.data.length);
  } catch (err) {
    console.error(err);
  }
};

export const postComment = (articleID, commentData) => async (dispatch) => {
  console.log(articleID, "is article id");
  console.log(commentData, "is commentdad");

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
  } catch (err) {
    console.log(err);
  }
};

export const advancePage = () => {
  return {
    type: ADVANCE_PAGE
  };
};
