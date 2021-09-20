import axios from "axios";
import config from "./config";

const register = (username, email, password) => {
  return axios.post(config.API_URL() + "signup", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  const body = { email: email, password: password};
  return axios.post(config.API_URL() + "login", body).then(response => {

      if(response.data.content.access_token){
        localStorage.setItem("user", response.data.content.access_token);
      }
      
      return response;
  });
};

const logout = () => {
  return axios.post(config.API_URL() + "auth/logout", {}, config.headerHttp() ).then(response => {
    console.log(response);
      if (response.status == "success") {
        localStorage.removeItem("user");
      }
      return response;
    });
};

export default {
  register,
  login,
  logout,
};
