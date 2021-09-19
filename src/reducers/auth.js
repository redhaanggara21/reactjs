import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from "../actions/types";

const access_token = localStorage.getItem("user");

const initialState = access_token
  ? { isLoggedIn: true, access_token }
  : { isLoggedIn: false, access_token: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      console.log(payload.user);
      return {
        isLoggedIn: true,
        access_token: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        access_token: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        access_token: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        access_token: null,
      };
    default:
      return state;
  }
}
