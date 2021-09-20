import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Select from "react-select";
import { connect } from "react-redux";
import { createBarang, updateBarang } from "../actions/barang";
import { useDispatch, useSelector } from "react-redux";
import { data } from 'jquery';
// import { set } from '@reduxjs/toolkit/node_modules/immer/dist/internal';

const FormBarang = React.memo(() => {

    
    const { dataselect } = useSelector((state) =>{
        return state.barangReducer;
    });

    const [status, setStatus] = useState(!dataselect?.id ? 'add' : 'edit');
    const [id, setId] = useState(dataselect?.id);
    const [namaBarang, setNamaBarang] = useState(dataselect?.NAMA_BARANG);
    const [harga, setHarga] = useState(dataselect?.HARGA);
    const [kategori, setKategori] = useState(dataselect?.KATEGORI);
    const [keterangan, setKeterangan] = useState(dataselect?.KETERANGAN);
    
    useEffect(() => {
        setStatus(!dataselect?.id ? 'add' : 'edit');
        setId(dataselect?.id);
        setNamaBarang(dataselect?.NAMA_BARANG);
        setHarga(dataselect?.HARGA);
        setKategori(dataselect?.KATEGORI);
        setKeterangan(dataselect?.KETERANGAN);
        return () => {
            // dataselect = {};
        }

    },[dataselect]);

    const dispatch = useDispatch();

    const listKategori = [
        {value: 'ATK', label: 'ATK'},
        {value: 'RT', label: 'RT'},
        {value: 'Masak', label: 'Masak'},
        {value: 'Elektro', label: 'Elektro'},
    ];

    const handleRemoveDataForm = (e) => {
        setId(null);
        setNamaBarang("");
        setHarga(0);
        setKategori("");
        setKeterangan("");
        setStatus("add");
    };


    const handleSaveDataForm = (e) => {
        e.preventDefault();
        if(status == "add"){
            dispatch(createBarang(namaBarang, harga, kategori, keterangan));
            handleRemoveDataForm();
        }else{
            const bodys = {
                'id': id,
                'NAMA_BARANG': namaBarang,
                'HARGA': harga,
                'KATEGORI': kategori,
                'KETERANGAN': keterangan
            };
            dispatch(updateBarang(bodys, id));
            handleRemoveDataForm();
        }
    }

    const handleChangeNamaBarang = (e) =>{
        setNamaBarang(e);
    }

    const handleChangePrice = (e) =>{
        setHarga(e);
    }

    const handleChangeKeterangan = (e) =>{
        setKeterangan(e);
    }


    return(
        <div>
            <Form onSubmit={handleSaveDataForm}>
                <h1>{ status == 'add' ? 'Add Barang' : 'Edit Barang' }</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nama Barang</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter nama"
                        onChange={e => handleChangeNamaBarang(e.target.value)}
                        value={ namaBarang } />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Harga</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter price"
                        onChange={e => handleChangePrice(e.target.value)} 
                        value={harga}/>
                </Form.Group>
                <Form.Group controlId="formBasicSelect">
                    <Form.Label>Kategori</Form.Label>
                    <Select
                          value = {
                            listKategori.filter(option => 
                               option.label === (!kategori ? "" : kategori))
                          }                     
                          placeholder="Select Gender"
                          className="full-width"
                          options={listKategori}
                          onChange={e => 
                            setKategori(e.value)
                          }></Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>KETERANGAN</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter keterangan"
                        onChange={e => handleChangeKeterangan(e.target.value)} 
                        value={keterangan}/>
                </Form.Group>

                <Row>
                    <Col xs={6}>
                        <Button 
                            variant="primary" 
                            type="submit">
                            { status  == 'add' ? 'Create' : 'Update' }
                        </Button>
                        &nbsp;
                        <Button 
                            type="button"
                            onClick={() => handleRemoveDataForm()}
                            variant="primary" >
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
});

// export default FormBarang;
// export default connect(null, { createBarang })(FormBarang);

const mapStateToProps = (state) => {
    return {
        dataselect: state.dataselect
    };
  };
  
export default connect(mapStateToProps, {
    createBarang
  })(FormBarang);