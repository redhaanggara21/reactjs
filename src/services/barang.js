import axios from "axios";
import config from "./config";

const index = (page, find, all) => {
    return axios.get(config.API_URL() + `mydata/barang?page=${page}&find=${find}&all=${all}`, config.headerHttp());
};

const create = (data) => {
    return axios.post(config.API_URL() + "mydata/barang", data, config.headerHttp());
};

const read = (id) => {
    return axios.get(config.API_URL() + `mydata/barang/${id}`, config.headerHttp());
};

const update = (data,id) => {
  return axios.put(config.API_URL() + `mydata/barang/${id}`, data, config.headerHttp() ).then(response => {
        return response;
    })
};

const deleted = (id) => {
    return axios.delete(config.API_URL() + `mydata/barang/${id}`,config.headerHttp() ).then(response => {
        return response;
    })
};

export default {
  index,
  create,
  read,
  update,
  deleted
};
