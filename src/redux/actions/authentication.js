import * as actionTypes from "./actionTypes";
import jwt_decode from "jwt-decode";
import axios from "axios";

// const setCurrentUser = token => ({
//   if(token) {
//     localStorage.setItem("token", token);
//     axios.defaults.headers.common.Authorization = `jwt ${token}`;
//     const user = jwt_decode(token);
//     return {
//       type: actionTypes.SET_CURRENT_USER,
//       payload: user
//     };
//   }
// });

const setCurrentUser = token => {
  let user;
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
    user = jwt_decode(token);
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    user = null;
  }

  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: user
  };
};

export const login = userData => {
  return async dispatch => {
    try {
      const response = await axios.post(
        "https://the-index-api.herokuapp.com/login/",
        userData
      );
      const user = response.data;
      dispatch(setCurrentUser(user.token));
    } catch (err) {
      console.log("An error occurred.", err);
    }
  };
};

export const signup = userData => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://the-index-api.herokuapp.com/signup/",
        userData
      );
      const user = res.data;
      dispatch(setCurrentUser(user.token));
    } catch (error) {
      console.error(error.response.data);
    }
  };
};

export const logout = () => setCurrentUser();

export const checkForExpiredToken = () => {
  // Check for token expiration
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    const currentTimeInSeconds = Date.now() / 1000;

    // Decode token and get user info
    user = jwt_decode(token);

    // Check token expiration
    if (user.exp >= currentTimeInSeconds) {
      // Set user
      return setCurrentUser(token);
    }
  }
  return logout();
};
