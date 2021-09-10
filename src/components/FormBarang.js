import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Select from "react-select";

// type StatusInterface  = {
//     status: 'add' | 'edit'
// }

const FormBarang = ({status, dataForm, removeDataForm, saveBarang}) => {
    const [namaBarang, setNamaBarang] = useState("");
    const [harga, setHarga] = useState("");
    const [kategori, setKategori] = useState();
    
    const listKategori = [
        {value: 'ATK', label: 'ATK'},
        {value: 'RT', label: 'RT'},
        {value: 'Masak', label: 'Masak'},
        {value: 'Elektro', label: 'Elektro'},
    ];

    const handleRemoveDataForm = (e) => {
        removeDataForm(dataForm.id);
    };

    const handleSaveDataForm = (e) => {
        e.preventDefault();
        dataForm.NAMA_BARANG = namaBarang.length > 0 ? namaBarang : dataForm.NAMA_BARANG;
        dataForm.HARGA = harga > 0 ? harga : dataForm.HARGA;
        dataForm.KATEGORI = kategori ? kategori : dataForm.KATEGORI;
        dataForm.KATEGORI = dataForm.KATEGORI == "" ? "RT" : dataForm.KATEGORI;
        saveBarang(dataForm);
    }

    const handleChangeNamaBarang = (e) =>{
        setNamaBarang(e);
    }

    const handleChangePrice = (e) =>{
        setHarga(e);
    }

    useEffect(() => {
        setHarga(dataForm.HARGA)
        return () => {
            
        }

    },[]);

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
                        defaultValue={dataForm.NAMA_BARANG} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Harga</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter price"
                        onChange={e => handleChangePrice(e.target.value)} 
                        defaultValue={dataForm.HARGA}/>
                </Form.Group>
                <Form.Group controlId="formBasicSelect">
                    <Form.Label>Kategori</Form.Label>
                    <Select
                          value = {
                            listKategori.filter(option => 
                               option.label === (!kategori ? dataForm.KATEGORI : kategori))
                          }                     
                          placeholder="Select Gender"
                          className="full-width"
                          options={listKategori}
                          onChange={e => 
                            setKategori(e.value)
                          }></Select>

                    {/* <Form.Control
                         as="select"
                         value={ dataForm.KATEGORI == "" ? kategori  : dataForm.KATEGORI }
                         onChange={e => {
                            console.log(e);
                            setKategori(e.target.value);
                         }} >
                        <option value="RT">RT</option>
                        <option value="Masak">Masak</option>
                        <option value="Elektro">Elektro</option>
                    </Form.Control> */}
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
};

export default FormBarang;