import {
  GET_BARANG,
  CREATE_BARANG,
  DELETE_BARANG,
  UPDATE_BARANG,
  DELETE_ALL_BARANG,
  READ_BARANG
} from "../actions/types";

const initialState = [];
const initialData = {};

function barangReducer(barangs = initialState, action) {

  const { type, payload, dataPagination ,dataselect } = action;

  switch (type) {
    case CREATE_BARANG:
      return {
        data: [...barangs.data, payload],
        dataselect: null,
        datapagination: barangs.datapagination
      };

    case GET_BARANG:
      return {
        data: payload,
        dataselect: null,
        datapagination: dataPagination
      }

    case READ_BARANG:
      return {
        data: barangs.data,
        dataselect: dataselect,
        datapagination: barangs.datapagination
      }

    case UPDATE_BARANG:
      const data = barangs.data.map((row) => {
        if (row.id === payload.id) {
          row.NAMA_BARANG = payload.NAMA_BARANG;
          row.HARGA = payload.HARGA;
          row.KATEGORI = payload.KATEGORI;
          row.KATERANGAN = payload.KATERANGAN;
          return row;
        }
        return row;
      });

      return {
        data: data,
        dataselect: null,
        datapagination: barangs.datapagination
      }

    case DELETE_BARANG:
      return {
        data: barangs.data.filter(({ id }) => id !== payload.id),
        dataselect: null,
        datapagination: barangs.datapagination
      };

    case DELETE_ALL_BARANG:
      return [];

    default:
      return barangs;
  }
};

export default barangReducer;