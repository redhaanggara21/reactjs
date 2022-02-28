import React, { useState, useEffect} from 'react';
import Header from '../../components/Header';
import { NavDropdown, Navbar, Nav, Form, FormControl, Button, Row, Col } from 'react-bootstrap'
import PenjualanList from '../../components/PenjualanList';
import penjualan from '../../services/penjualan';
import CatalogPenjualan from '../../components/CatalogPenjualan';
import FormPenjualan from '../../components/FormPenjualan';
import SelectBarang from '../../components/SelectBarang';
import '../../components/component.css';
import Select from 'react-select';
import barang from '../../services/barang';
import user from '../../services/user';
import BarangAlreadyBuy from '../../components/BarangAlreadyBuy';

import AppContext from '../../contexts/appContext';

const Preferences = (props) => {

  const abstractForm = (qty=0, kode_barang=0, harga=0) => {
    return { QTY: qty, KODE_BARANG: kode_barang, HARGA: harga};
  }

  const [dataPenjualan, setDataPenjualan] = useState([]);
  const [dataCatalog, setCatalog] = useState([]);
  const [openForm, setForm] = useState(false);
  const [arrCatalog, setArrCatalog] = useState([]);
  const [arrRow, setArrRow] = useState([1]);
  const [formValues, setFormValues] = useState([abstractForm(0,0,0)]);


  const [arrBarang, setArrBarang] = useState([]);
  const [arrUser, setUser] = useState([]);
  const [addOrUpdate, setAddOrUpdate] = useState("");
  const [chooseUserUpdate, setChooseUserUpdate] = useState("");
  const [formUpdate, setFormUpdate] = useState();

  const [userSelect, setUserSelect] = useState({
    GENDER: "#",
    created_at: "",
    email: "#",
    email_verified_at: null,
    id: 0,
    label: "#",
    name: "#",
    status: "#",
    updated_at: "#",
    value: 0
  });
  const [totalPenjualan, setTotalPenjualan] = useState(0);

  const handleLogout =  (e) => {
    console.log("easy");
  }

  const addPenjualan = () => {
    setTotalPenjualan(0);
    setFormValues([abstractForm(0,0,0)]);

    setForm(!openForm);
    setAddOrUpdate("add");
    
    user.userActive().then(response => {
      response.data.data.map((data,index) => {
        data.value = data.id;
        data.label = data.name;
      });
      setUser(response.data.data);
    }, (error) => {
        console.log(error);
      }
    );
  }
  
  const handleRemoving = (e) => {
    penjualan.deleted(e).then(response => {
        if(response.data.success){
            alert("Deleted");
            window.location.reload();
        }
    }).catch(errror =>{
        console.log(errror);
    })
  }

  const handleReading = (e) => {
    setCatalog(e);
  }

  function resetFormField(){
    const tempArray = [];
    setFormValues(tempArray);
    setFormValues(
      (prevState) => {
        return [abstractForm(0, 0, 0)];
      }
    );
  }

  useEffect(() => {

    // initialize
    const formRowValues = [...formValues];
    setFormValues(formRowValues);
    
    penjualan.index().then(response => {
      setDataPenjualan(response.data.data);
      }, (error) => {
        console.log(error);
      }
    );
    
    barang.index(null,null,true).then(response => {
      const row = response.data.data.map((data,index) => {
        data.value = data.id;
        data.label = data.NAMA_BARANG;
        return data;
      });
      setArrBarang(row);
    }, (error) => {
        console.log(error);
      }
    );

    return () => {
      // cancel your api calls here so that there won't be any data leaks
    }

  },[]);

  const handleUpdating = (e) => {
    console.log(e);
    // const formRowValues = [...formValues];
    // formRowValues.push(abstractForm(0, 0, 0));
    // formRowValues.push(abstractForm(0, 0, 0));
    // setFormValues(formRowValues);
    // setFormValues(
    //   [...formValues, 
    //     abstractForm(0, 0, 0)
    //   ]
    // );
    // console.log(formValues);
    // return;
    // formRowValues.push(abstractForm(0, 0, 0));
    // setFormValues(formRowValues);
    // console.log(formValues);
    // resetFormField();
    setForm(!openForm);
    setAddOrUpdate("edit");
    setFormUpdate(e);
    e.pelanggan.value = e.pelanggan.id;
    e.pelanggan.label = e.pelanggan.name;
    setUserSelect(e.pelanggan);
    setChooseUserUpdate(e.pelanggan);
    setTotalPenjualan(e.TOTAL);
    // if(e.item_penjualan.length > 0){
    //   e.item_penjualan.map((data, index) => {

    //     if(index > 0){
    //       setFormValues(
    //         [...formValues, 
    //           abstractForm(data.QTY, data.KODE_BARANG, e.barang_penjualan[index].HARGA)
    //         ]
    //       );
    //     }
        
    //     e.barang_penjualan[index].label = e.barang_penjualan[index].NAMA_BARANG;
    //     e.barang_penjualan[index].value = e.barang_penjualan[index].id;
    //     console.log(index);
    //     addFormFields();
    //     // handleChangeSelect(index, { 
    //     //   QTY: e.item_penjualan[index].QTY,
    //     //   label: e.barang_penjualan[index].NAMA_BARANG,
    //     //   KODE_BARANG: data.KODE_BARANG, 
    //     //   HARGA: e.barang_penjualan[index].HARGA,
    //     //   value: data.KODE_BARANG,
    //     //   label: e.barang_penjualan[index].NAMA_BARANG
    //     // });

    //   });

    //   console.log(formValues);
    //   summaryTotal(formValues);
    // }
  }

  const handleRemovingSelectBarang = (e) => {
    const tempArray = arrRow.filter((item,index) => e !== index);
    setArrRow(tempArray);
  }

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...formValues];
    list[index][name] = parseInt(value);
    setFormValues(list);
    summaryTotal(formValues);
  };

  const handleChangeSelect = (index, e) => {
    const list = [...formValues];
    list[index]['KODE_BARANG'] = e.value;
    list[index]['HARGA'] = e.HARGA;
    setFormValues(list);
    summaryTotal(formValues);
  }

  const addFormFields = () => {
    setFormValues(
      [...formValues, abstractForm(0,0,0)]
    )
  }

  const removeFormFields = (i) => {
    let formValuess = formValues.filter((item,index) => i !== index);
    setFormValues(formValuess);
    summaryTotal(formValuess);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      TOTAL: totalPenjualan,
      KODE_PELANGGAN: userSelect.id,
      ITEM_PENJUALAN: JSON.stringify(formValues)
    }

    if(addOrUpdate === "edit"){
      penjualan.update(body, formUpdate.id).then(response => {
        alert("Updating")
        window.location.reload();
      }, (error) => {
        console.log(error);
      });
    }else{
      penjualan.create(body).then(response => {
        alert("Succes");
        window.location.reload();
      }, (error) => {
        console.log(error);
      });
    }
  }

  const handleChangeUser = (e) => {
    setUserSelect(e);
  }

  function summaryTotal(listbarang){
    let sum = 0;
    listbarang.map((data,index) => {
      sum = sum + ( data.HARGA * data.QTY);
    });
    if (isNaN(sum)) sum = 0;
    setTotalPenjualan((prev) => {
      // console.log(prev);
      if(addOrUpdate == "edit") {
        return prev + sum;
      }else {
        return sum;
      }
    });
  }

  return(
    <div>

      <AppContext.Provider value={{"activeHeader": "penjualan"}}>
        <Header logoutEvent={handleLogout}/>
      </AppContext.Provider>

      <div className="container">
          <h2>Penjualan {openForm}</h2>
          <Button
            onClick={addPenjualan}>
            {  !openForm ? 'Add Penjualan' : 'Close' }
          </Button>
            {
            !openForm ? 
              <Row>
                <Col xs={8}>
                    <PenjualanList
                        updating={ handleUpdating } 
                        reading={handleReading}
                        removing={handleRemoving} 
                        dataPenjualan={dataPenjualan}/>
                </Col>
                <Col xs={4}>
                    <CatalogPenjualan
                      data={dataCatalog}/>
                </Col>
              </Row>

            : 

            <Row>
                <Col xs={7}>
                  <br/>
                  <div className="form-inline">
                      <label>Pelanggan</label>
                      { 
                      addOrUpdate == 'add' ? 
                        <Select
                              placeholder="Select Pelangan"
                              className="full-width"
                              onChange={e => handleChangeUser(e)}
                              options={arrUser}></Select>
                      : <Select
                          defaultValue={chooseUserUpdate}
                          placeholder="Select Pelangan"
                          className="full-width"
                          onChange={e => handleChangeUser(e)}></Select>
                       }
                  </div>
                  <form  onSubmit={handleSubmit}>
                      { formValues.map((element, index) => (
                          <div className="form-inline" key={index}>
                          <label>BARANG</label>
                        
                        { element.TYPE != "add" ?
                        
                            <Select
                                placeholder="Select Barang"
                                className="width-select"
                                onChange={e => handleChangeSelect(index, e)}
                                options={arrBarang}></Select> 
                          :
                            
                            <Select
                                placeholder="Select Barang"
                                defaultValue={ arrBarang.filter((item, index) => item.id === element.KODE_BARANG) }
                                className="width-select"
                                onChange={e => handleChangeSelect(index, e)}></Select> 
                        }
                          

                          <label className="ml-20">QTY</label>
                          <input type="number" name="QTY" value={element.QTY || ""} onChange={e => handleChange(index, e)} />
                          {
                              index ? 
                              <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                              : null
                          }
                          </div>
                      ))}
                      <div className="button-section">
                          <button className="button add" type="button" onClick={() => addFormFields()}>+Add</button>
                          <button className="button submit" type="submit">Create</button>
                      </div>
                  </form>

                </Col>
                <Col xs={5}>
                    <FormPenjualan
                      total={totalPenjualan}
                      user={userSelect}/>
                      {
                        addOrUpdate == "edit" &&
                          <BarangAlreadyBuy datas={formUpdate}/>
                      }
                      
                </Col>
            </Row>
            }
            
      
      </div>
    </div>
  );
}

export default Preferences;