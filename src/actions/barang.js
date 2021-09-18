import {
  GET_BARANG,
  CREATE_BARANG,
  DELETE_BARANG,
  UPDATE_BARANG,
  READ_BARANG
} from "./types";
  
import barangService from "../services/barang";

export const createBarang = (nama, harga, kategori, keterangan) => async (dispatch) => {

    const bodys = {
      'NAMA_BARANG': nama,
      'HARGA': harga,
      'KATEGORI': kategori,
      'KETERANGAN': keterangan
    };

    return barangService.create(bodys).then((response) => {
          dispatch({
            type:   CREATE_BARANG,
            payload: response.data.data,
          });
        return Promise.resolve(response.data.data);

      }, (error) => {
        return Promise.reject(error);
      });
      // try {
      //   const res = barangService.create(bodys);
      //         console.log(res);
      //         dispatch({
      //           type:   CREATE_BARANG,
      //           payload: res.data,
      //         });
      //       return Promise.resolve(res.data.message);
      // } catch (err) {
      //   return Promise.reject(err);
      // }
};


export const retrieveBarangs = (page = 1) => async (dispatch) => {
  try {
    const res = await barangService.index(page);
    console.log(res);
    dispatch({
      type: GET_BARANG,
      payload: res.data.data.data,
      dataPagination: res.data.data
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateBarang = (data, id) => async (dispatch) => {

  try {

    const res = await barangService.update(data, id);
    console.log(res);
    dispatch({
      type: UPDATE_BARANG,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteBarang = (id) => async (dispatch) => {
  try {
    const res = await barangService.deleted(id);
    console.log(res);
    dispatch({
      type: DELETE_BARANG,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const findById = (id) => async (dispatch) => {
  try {
    const res = await barangService.read(id);
    dispatch({
      type: READ_BARANG,
      payload: null,
      dataselect: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};