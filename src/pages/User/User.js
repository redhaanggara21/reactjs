import React, { useState, useEffect }  from 'react';
import Header from '../../components/Header';
import { logout_ } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown, Navbar, Nav, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import PelangganList from '../../components/PelangganList';
import FormPelanggan from '../../components/FormPelanggan';

import user from '../../services/user';

const User = (props) => {
    const dispatch = useDispatch();
    const [dataPelanggan, setDataPelanggan] = useState([]);
    const [status, setStatus] = useState("add");
    const [dataForm, setDataForm] = useState({
            "id": null,
            "name": null,
            "GENDER": null,
            "email": null,
            "email_verified_at": null,
            "status": null,
    });

    const handleLogout =  (e) => {
        dispatch(logout_()).then(response => {
            localStorage.removeItem("user");
            props.history.push("/login");
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        
        user.index().then(response => {
            setDataPelanggan(response.data.data);
        });

        return () => {
            // cancel your api calls here so that there won't be any data leaks
        }
    
    },[]);
    
    const handleUpdating = (e) => {
        setStatus("edit");
        setDataForm(e);
    }

    const saveUser = (e) =>{
        if(status === "edit"){
            user.update(e, e.id).then(response => {
                window.location.reload();  
                alert("updated");
            },error => {
                console.log(error);
            })
        } else{
            user.create(e).then(response => {
                window.location.reload();  
                alert("added");
            },error => {
                console.log(error);
            })
        }
    }

    const removeDataForm = (e) => {
        setStatus("add");
        setDataForm(
            {
                "id": null,
                "name": null,
                "GENDER": null,
                "email": null,
                "email_verified_at": null,
                "status": null,
            }
        )
    }
    
    return(
        <div>
            <Header logoutEvent={handleLogout}/>
                <div className="container">
                    <Row>
                        <Col xs={8}>
                            <PelangganList
                                updating={handleUpdating} 
                                dataPelanggan={dataPelanggan}/>
                        </Col>
                        <Col xs={4}>
                            <FormPelanggan
                                removeDataForm={removeDataForm}
                                status={status} 
                                dataForm={dataForm}
                                saveData={saveUser}/>
                        </Col>
                    </Row>
                </div>
        </div>
    )
}

export default User;