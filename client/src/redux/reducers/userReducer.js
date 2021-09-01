import * as actionTypes from "../actionTypes";

const initialState = {
  userData: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        userData: action.payload,
      };

    case actionTypes.SIGNIN_FAIL:
      return {
        error: action.payload,
      };

    case actionTypes.SIGNUP_FAIL:
      return {
        error: action.payload,
      };

    case actionTypes.LOGOUT_SUCCESS:
      localStorage.removeItem("user");
      return {
        ...state,
        userData: null,
      };

    case actionTypes.LOGOUT_FAIL:
      return {
        error: action.payload,
      };

    case actionTypes.REFRESH_ACCESS_TOKEN_SUCCESS:
      const data = { user: state.userData.user, accessToken: action.payload };

      localStorage.setItem("user", JSON.stringify(data));
      return {
        ...state,
        userData: data,
      };

    case actionTypes.REFRESH_ACCESS_TOKEN_FAIL:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
