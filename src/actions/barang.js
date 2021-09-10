import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    SET_MESSAGE,
  } from "./types";
  
  import barangService from "../services/barang";

//   export const index_ = () => (dispatch) => {
//     return barangService.index().then(
//       (response) => {
//         dispatch({
//           type: REGISTER_SUCCESS,
//         });
  
//         dispatch({
//           type: SET_MESSAGE,
//           payload: response.data.message,
//         });
  
//         return Promise.resolve();
//       },
//       (error) => {
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
  
//         dispatch({
//           type: REGISTER_FAIL,
//         });
  
//         dispatch({
//           type: SET_MESSAGE,
//           payload: message,
//         });
  
//         return Promise.reject();
//       }
//     );
//   };
  
//   export const create_ = (data) => (dispatch) => {
//     return barangService.create(data).then(
//       (data) => {
//         dispatch({
//           type: LOGIN_SUCCESS,
//           payload: { user: data },
//         });
  
//         return Promise.resolve();
//       },
//       (error) => {
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
  
//         dispatch({
//           type: LOGIN_FAIL,
//         });
  
//         dispatch({
//           type: SET_MESSAGE,
//           payload: message,
//         });
  
//         return Promise.reject();
//       }
//     );
//   };
  
//   export const logout_ = () => (dispatch) => {
//     return authService.logout().then(
//       (data) => {
//         console.log(data);
//         dispatch({
//           type: LOGOUT_SUCCESS,
//           payload: { user: data },
//         });
  
//         return Promise.resolve();
//       },
//       (error) => {
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
  
//         dispatch({
//           type: LOGIN_FAIL,
//         });
  
//         dispatch({
//           type: LOGOUT_FAIL,
//           payload: message,
//         });
  
//         return Promise.reject();
//       }
//     );
  
//   };