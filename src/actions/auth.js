import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  SET_MESSAGE,
} from "./types";

import authService from "../services/authService";

export const register_ = (username, email, password) => (dispatch) => {
  return authService.register(username, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();

    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login_ = (email, password) => (dispatch) => {
  return authService.login(email, password).then((data) => {

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data.data.content.access_token },
      });

      dispatch({
        type: SET_MESSAGE,
        payload: { msg: data.data.msg, status: 'success' },
      });

      return Promise.resolve();
    }, (error) => {

      if (error.response) {

        dispatch({ type: LOGIN_FAIL });
        dispatch({ type: SET_MESSAGE, payload: { msg: error.response.data.msg, status: 'danger' } });

      } else if (error.request) {

        dispatch({ type: LOGIN_FAIL });
        dispatch({ type: SET_MESSAGE, payload: { msg: "Network Error", status: 'danger' } });

      } else {
        
        dispatch({ type: LOGIN_FAIL });
        dispatch({ type: SET_MESSAGE, payload: { msg: "Network in maintance", status: 'danger' } });

      }

      return Promise.resolve();
    }
  );
};

export const logout_ = () => (dispatch) => {
  return authService.logout().then(
    (data) => {
      console.log(data);
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: LOGOUT_FAIL,
        payload: message,
      });

      return Promise.reject();
    }
  );

};
