import React, { useState, useEffect }  from 'react';
import Header from '../../components/Header';
import { NavDropdown, Navbar, Nav, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { logout_ } from "../../actions/auth";
import barangService from "../../services/barang";
import BarangList from '../../components/BarangList';
import FormBarang from '../../components/FormBarang';

import AppContext from '../../contexts/appContext';
  
const Barang = (props) => {

  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [databarang, setDataBarang] = useState([]);
  const [titleForm, titleFormSet] = useState("add");
  let [dataForm, dataFormSet] = useState({
    HARGA: null,
    KATEGORI: "",
    NAMA_BARANG: "",
    KETERANGAN: "",
    created_at: "",
    id: 0
  });

  useEffect(() => {
    barangService.index().then(response => {
        setDataBarang(response.data.data);
      }, (error) => {
        console.log(error);
      }
    );

    return () => {
      // cancel your api calls here so that there won't be any data leaks
    }

  },[]);

  const handleLogout =  (e) => {
      // e.preventDefault();
      dispatch(logout_()).then(response => {
          localStorage.removeItem("user");
          props.history.push("/login");
          window.location.reload();
      }).catch(error => {
          console.log(error);
      });
  }

    const removeBarang =  (id) => {
        barangService.deleted(id).then(response => {
            if(response.data.success){
                alert("Deleted");
                window.location.reload();
                // databarang.splice(id, 1); 
                // setDataBarang(databarang);
            }
        }).catch(errror =>{
            console.log(errror);
        })
        // e.preventDefault();
    }

    const editBarang =  (data) => {
        titleFormSet("edit");
        dataFormSet(data[0]);
    }


    const saveBarang =  (e) => {
      if(titleForm == "add"){
        barangService.create(e).then(response => {
          if(response.data.success){
              if(response.status){
                alert("created");
                titleFormSet("add");
                dataFormSet({
                  HARGA: 0,
                  KATEGORI: "",
                  NAMA_BARANG: "",
                  KETERANGAN: "",
                  created_at: "",
                  id: 0
                }); 
                window.location.reload();   
              }
          }
        }).catch(errror =>{
            console.log(errror);
        })
      }else{
        barangService.update(e,e.id).then(response => {
          if(response.data.success){
              if(response.status){
                alert("updating");
                titleFormSet("add");
                dataFormSet({
                  HARGA: 0,
                  KATEGORI: "",
                  NAMA_BARANG: "",
                  KETERANGAN: "",
                  created_at: "",
                  id: 0
                });
                window.location.reload();  
              }
          }
        }).catch(errror =>{
            console.log(errror);
        })
      }
    }

    const removeDataForm = () =>{
      titleFormSet("add");
      dataFormSet({
        HARGA: 0,
        KATEGORI: "",
        NAMA_BARANG: "",
        KETERANGAN: "",
        created_at: "",
        id: 0
      });
    }

  // if (isLoggedIn) {
  //     return <Redirect to="/login" />;
  // }

  return(
    <div>

    <AppContext.Provider value={{"activeHeader": "barang"}}>
        <Header logoutEvent={handleLogout}/>
    </AppContext.Provider>

      <div className="container">
          <h2>Barang</h2>
            <Row>
                <Col xs={8}>
                    <BarangList 
                        editEvent={editBarang} 
                        removeEvent={removeBarang} 
                        dataBarang={databarang}/>
                </Col>
                <Col xs={4}>
                    <FormBarang 
                        status={titleForm} 
                        dataForm={dataForm}
                        saveBarang={saveBarang}
                        removeDataForm={removeDataForm}/>
                </Col>
            </Row>
      </div>
    </div>
  );
}

export default Barang;