import axios from "axios";
import config from "./config";

const index = () => {
    return axios.get(config.API_URL() + "all_user", config.headerHttp());
};

const userActive = () => {
  return axios.get(config.API_URL() + "all_user_active", config.headerHttp());
};

const update = (data,id) => {
  return axios.put(config.API_URL() + `auth/updateuser/${id}`, data, config.headerHttp() ).then(response => {
      return response;
  });
};

const create = (data) => {
  data.password = "123456";
  data.c_password = "123456";
  return axios.post(config.API_URL() + "register", data, config.headerHttp()).then(response => {
      return response;
  });
};


export default {
  index,
  update,
  userActive,
  create
};
