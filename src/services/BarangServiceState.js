import React, { useReducer } from "react"

// Bring the context
import AppContext from "./contexts/TodoAppContextContext";

// Bring the reducer
import barangReducer from "./reducers/barangReducer";

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

import axios from "axios";
import config from "./config";

const BarangServiceState = ({ children }) => {

  // Define our state
  const initialState = {
    barangList: [],
    namaBarang: "",
    harga: 0,
    kategori: "",
    keterangan: "",
    loading: true
  }

  // Dispatch the reducer
  // This come from useReducer from ReactJS
  const [state, dispatch] = useReducer(barangReducer, initialState);

  // Set the title for the new todo
  // This will change whenever user type in the form later

  const setNamaBarang = (payload) => {
    dispatch({ type: SET_NAMA_BARANG, payload })
  }

  const setHarga = (payload) => {
    dispatch({ type: SET_HARGA_BARANG, payload })
  }

  const setKategori = (payload) => {
    dispatch({ type: SET_KATEGORI_BARANG, payload })
  }

  const setKeterangan = (payload) => {
    dispatch({ type: setKeterangan, payload })
  }

  // Get todos
  const indexBarang = async () => {
    try {

        const barangs =  axios.get(config.API_URL() + "mydata/barang", config.headerHttp());
        cosnsole.log(barangs);
        const toJSON  = await barangs.json();
        dispatch({ type: GET_BARANG, payload: toJSON })

    } catch (err) {
      console.error(err.message)
    }
  }

  // Create todo
  const createBarang = async (data) => {
    try {
       const barangs =  axios.post(config.API_URL() + "mydata/barang", data, config.headerHttp());
       const toJSON = await barangs.json()
       cosnsole.log(barangs);
       dispatch({ type: CLEAR_NAMA_BARANG });
       dispatch({ type: CLEAR_HARGA_BARANG });
       dispatch({ type: CLEAR_KATEGORI_BARANG });
       dispatch({ type: CLEAR_KETERANGAN_BARANG });
       dispatch({ type: CREATE_BARANG, payload: toJSON });
    } catch (err) {
      console.error(err.message)
    }
  }

    // update todo
    const updateBarang = async (id) => {
        try {
           const barangs =  axios.put(config.API_URL() + `mydata/barang/${id}`, data, config.headerHttp());
           const toJSON = await barangs.json()
           cosnsole.log(barangs);
           dispatch({ type: CLEAR_NAMA_BARANG });
           dispatch({ type: CLEAR_HARGA_BARANG });
           dispatch({ type: CLEAR_KATEGORI_BARANG });
           dispatch({ type: CLEAR_KETERANGAN_BARANG });
           dispatch({ type: UPDATE_BARANG, payload: toJSON })
        } catch (err) {
          console.error(err.message)
        }
      }

  // Delete Todo
  const deleteBarang = async (id) => {
    try {
        const barangs = axios.delete(config.API_URL() + `mydata/barang/${id}`,config.headerHttp());
        dispatch({ type: DELETE_BARANG, payload: id })
        console.log(barangs);
    } catch (err) {
      console.error(err.message)
    }
  }

  // Destruct the states
  const { barangList, namaBarang, harga, kategori, keterangan, loading } = state;

  // Here's where we gonna use this state and funcitons to dealing with the context
  // The context will wrapping our entire application with this component and accept children in it
  // Anything state or function, must be passed in to value props in this provider in order to use it
  // NOTE: PLEASE NOTICE, IF YOU DIDN'T PASS THE STATE OR THE FUNCTION in THIS VALUE PROPS, YOU WILL GET AN ERROR

  return (
    <TodoContext.Provider
      value={{
        barangList,
        namaBarang,
        harga,
        kategori,
        keterangan,
        loading,
        setNamaBarang,
        setHarga,
        setKategori,
        setKeterangan,
        createBarang,
        indexBarang,
        updateBarang,
        deleteBarang
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export default BarangServiceState;