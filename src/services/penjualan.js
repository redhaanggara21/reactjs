import axios from "axios";
import config from "./config";

console.log(config.API_URL());

const index = () => {
    return axios.get(config.API_URL() + "mydata/penjualan", config.headerHttp());
};

const create = (data) => {
    return axios.post(config.API_URL() + "mydata/penjualan", data, config.headerHttp()).then(response => {
        return response;
    });
};

const read = (id) => {
    return axios.get(config.API_URL() + `mydata/penjualan/${id}`, config.headerHttp());
};

const update = (data,id) => {
  return axios.put(config.API_URL() + `mydata/penjualan/${id}`, data, config.headerHttp() ).then(response => {
        return response;
    })
};

const deleted = (id) => {
    return axios.delete(config.API_URL() + `mydata/penjualan/${id}`,config.headerHttp() ).then(response => {
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
