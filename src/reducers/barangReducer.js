// Dont Forget import the types
import {

    GET_BARANG,
    CREATE_BARANG,

    DELETE_BARANG,
    UPDATE_BARANG,

    SET_NAMA_BARANG,
    CLEAR_NAMA_BARANG,

    SET_HARGA_BARANG,
    CLEAR_HARGA_BARANG,

    SET_KATEGORI_BARANG,
    CLEAR_KATEGORI_BARANG,

    SET_KETERANGAN_BARANG,
    CLEAR_KETERANGAN_BARANG

  } from "../actions/type";
  
  export default (state, { type, payload }) => {
    switch (type) {

      // Get all todos
      case GET_BARANG:
        return {
          ...state,
          loading: false,
          barangList: payload
        }

      // Set value for form
      case SET_NAMA_BARANG:
        return {
          ...state,
          NAMA_BARANG: payload
        }

      // Set value for form
      case CLEAR_NAMA_BARANG:
        return {
          ...state,
          NAMA_BARANG: ""
        }

       // Set value for form
      case SET_HARGA:
        return {
          ...state,
          HARGA: payload
        }

      // Set value for form
      case CLEAR_HARGA:
        return {
          ...state,
          HARGA: 0
        }

          // Set value for form
      case SET_KATEGORI:
        return {
          ...state,
          KATEGORI: payload
        }

      // Set value for form
      case CLEAR_KATEGORI:
        return {
          ...state,
          KATEGORI: null
        }

          // Set value for form
      case SET_KETERANGAN:
        return {
          ...state,
          KETERANGAN: payload
        }

      // Set value for form
      case CLEAR_KETERANGAN:
        return {
          ...state,
          KETERANGAN: 0
        }

      // Create a new todo
      case CREATE_BARANG:
        return {
          ...state,
          barangs: [payload, ...state.barangs]
        }

        // Create a new todo
      case UPDATE_BARANG:
        return {
          ...state,
          barangs: [payload, ...state.barangs]
        }

      // Delete a todo
      case DELETE_BARANG:
        return {
          ...state,
          barangList: state.barangList.filter((todo) => todo.id !== payload)
        }
      default:
        return state
    }
  }