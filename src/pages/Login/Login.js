import React, { useState, useRef, useEffect } from 'react';
import './Login.css';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { login_ } from "../../actions/auth";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import Loading from '../../components/Loading';
import { connect } from "react-redux";

const Login = (props) => {
    
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector((state) => {
        return state.auth;
    });


    useEffect(() => {

        if(isLoggedIn){
            // props.history.push("/barang");
        }

        return () => {
            
        };

    },[isLoading, isLoggedIn]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    
    const onSubmit =  (e) => {
        setLoading(!isLoading);
        dispatch(login_(e.email, e.password)).then(() => {
            setLoading(!isLoading);
            props.history.push("/barang");
            // window.location.reload();
        }).catch(() => {
            setLoading(!isLoading);
        });
    }


    return(
        <div className="container login-form">
            <Loading isLoading={isLoading}/>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        name="email"
                        type="text"
                        placeholder="your email"
                        {...register("email", { required: true, maxLength: 30 })}/>
                    
                    {errors.email && errors.email.type === "required" && <span>email is required</span>}
                    {errors.email && errors.email.type === "maxLength" && <span>email length exceeded</span> }

                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        name="password"
                        type="password"
                        placeholder="your password"
                        {...register("password", { required: true, maxLength: 30 })}/>
                    
                    {errors.password && errors.password.type === "required" && <span>password is required</span>}
                    {errors.password && errors.password.type === "maxLength" && <span>password max length exceeded</span> }

                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        auth: state.auth
    };
  };
  
export default connect(mapStateToProps, {
    login_
  })(Login);