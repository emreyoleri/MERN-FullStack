import * as actionTypes from "../actionTypes";
import * as API from "../../axios/index";

export const signUp = (formData, history) => async (dispatch) => {
  try {
    const { data } = await API.signUp(formData);
    dispatch({
      type: actionTypes.AUTH,
      payload: data,
    });

    history.push("/");
  } catch (error) {
    dispatch({
      type: actionTypes.SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signIn = (formData, history) => async (dispatch) => {
  try {
    const { data } = await API.signIn(formData, history);
    dispatch({
      type: actionTypes.AUTH,
      payload: data,
    });
    history.push("/");
  } catch (error) {
    dispatch({
      type: actionTypes.SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const autoSignIn = () => (dispatch) => {
  const data = JSON.parse(localStorage.getItem("user"));

  dispatch({
    type: actionTypes.AUTO_SIGNIN_SUCCESS,
    payload: data,
  });
};

export const logOut = (id) => async (dispatch) => {
  try {
    const { message } = await API.logOut(id);
    dispatch({
      type: actionTypes.LOGOUT_SUCCESS,
      payload: message,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOGOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAccessToken = (id) => async (dispatch) => {
  try {
    const { data } = await API.refreshAccessToken(id);

    dispatch({
      type: actionTypes.REFRESH_ACCESS_TOKEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.REFRESH_ACCESS_TOKEN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
