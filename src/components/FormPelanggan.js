import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Select from "react-select";
import { useForm } from "react-hook-form";

function FormPelanggan ({status, dataForm, saveData, removeDataForm}){


    const [gender, setGender] = useState();
    const [statuss, setStatuss] = useState();


    const listStatus = [
        {value: 'active', label: 'active'},
        {value: 'unactived', label: 'unactived'}
    ];

    const listGender = [
        {value: 'FEMALE', label: 'FEMALE'},
        {value: 'MALE', label: 'MALE'}
    ];

    useEffect(() => {

        return () => {
            
        }
    },[]);
    
    const handleSaveDataForm = (e) => {
        e.preventDefault();
        dataForm.GENDER = gender ? gender : dataForm.GENDER;
        dataForm.status = statuss ? statuss : dataForm.status;
        saveData(dataForm);
    }

    const handleChangeInputName = (e) =>{
        // setNamaBarang(e);
        dataForm.name = e.target.value;
    }

    const handleChangeInputEmail = (e) =>{
        // console.log(dataForm);
        // setNamaBarang(e);
        dataForm.email = e.target.value;
    }

    const handleChangeStatus = (e) =>{
        console.log(e);
        dataForm.status = e;
        setStatuss(dataForm.status);
        // setNamaBarang(e);
    }

    const handleRemoveDataForm = (e) => {
        setGender();
        setStatuss();
        removeDataForm(dataForm.id);
    };

    const handleChangeGender = (e) => {
        setGender(e.target.value);
    }

    return(
        <div>
            <Form onSubmit={handleSaveDataForm}>
                <h3>{ status == 'add' ? 'Add Pelanggan' : 'Edit Pelanggan' }</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter nama"
                        onChange={e => handleChangeInputName(e)}
                        defaultValue={dataForm.name} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter Email"
                        onChange={e => handleChangeInputEmail(e)} 
                        defaultValue={dataForm.email}/>
                </Form.Group>
                <Form.Group controlId="formBasicSelect">
                    <Form.Label>GENDER</Form.Label>
                    <Select
                          value = {
                            listGender.filter(option => 
                               option.label === (!gender ? dataForm.GENDER : gender))
                          }                     
                          placeholder="Select Gender"
                          className="full-width"
                          options={listGender}
                          onChange={e => 
                            setGender(e.value)
                          }></Select>

                </Form.Group>

                <Form.Group controlId="formBasicSelect">
                    <Form.Label>Status {statuss}</Form.Label>
                    <Select
                          value = {
                            listStatus.filter(option => 
                               option.label === (!statuss ? dataForm.status: statuss) )
                          }
                          placeholder="Select Status"
                          className="full-width"
                          options={listStatus}
                          onChange={e => 
                            setStatuss(e.value)
                          }></Select>
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

export default FormPelanggan;