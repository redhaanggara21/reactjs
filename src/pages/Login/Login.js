import React, { useState, useRef } from 'react';
import './Login.css';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { login_ } from "../../actions/auth";
import { Form, Button, Row, Col } from 'react-bootstrap';

const Login = (props) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.auth);

    const handleSubmit =  (e) => {
        e.preventDefault();
        // setLoading(true);
        dispatch(login_(email, password)).then((response) => {
            console.log(response);
            props.history.push("/barang");
            window.location.reload();
        }).catch((error) => {
            console.log(error);
            // setLoading(false);
        });
        // setToken("");
    }

    // if (isLoggedIn) {
    //     return <Redirect to="/dashboard" />;
    // }

    return(
        <div className="container login-form">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Login;