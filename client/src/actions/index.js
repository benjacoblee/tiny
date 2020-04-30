import axios from "axios";
import { AUTH_USER } from "./types";

export const authUser = (loginDetails) => async (dispatch) => {
  console.log(loginDetails);
  try {
    let response = await axios.post("/api/auth", loginDetails);
    console.log(response.data); // get token, keep somewhere
  } catch (err) {
    if (err) {
      console.log(err.message); // auth failed
    }
  }

  // return {
  //   type: AUTH_USER,
  //   payload: loginDetails
  // };
};
