import React, { useState, useRef, useEffect } from 'react';
import './Login.css';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { login_ } from "../../actions/auth";
import { Form, Button, Row, Col, Alert, variant } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import Loading from '../../components/Loading';
import { connect } from "react-redux";

const Login = (props) => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector((state) => {
        return state.auth;
    });

    const { message } = useSelector((state) => {
        return state.message;
    });

    
    useEffect(() => {
        console.log(message);
        if(message?.status == "success"){
            setShow(true);
            const timer = setTimeout(() => {
                setLoading(false);
                props.history.push("/barang");
                window.location.reload();
            }, 2000);
            // clearTimeout(timer);
        }else{
            setShow(true);
            setLoading(false);
        }
        // const timer = "";
        // if(!message?.status == "success"){
        //     setLoading(!isLoading);
        //     props.history.push("/barang");
        //     window.location.reload();
            // timer = setTimeout(() => {
            //     setLoading(!isLoading);
            //     props.history.push("/barang");
            //     window.location.reload();
            // }, 3000);
        // }else{
        //     setLoading(!isLoading);
        // }

        return () => {
            
        }

    },[isLoading, isLoggedIn, message]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    
    const onSubmit =  (e) => {
        setLoading(true);
        dispatch(login_(e.email, e.password));
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

                {show && (

                    <Alert variant={message.status} onClose={() => setShow(false)} dismissible>
                         {message.msg}
                    </Alert>

                )}

                <Button variant="primary" type="submit">
                    Login
                </Button>



            </Form>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state);

    const { auth } = state.auth;
    const { message } = state.message;

    return {
        auth,
        message
    };
  };
  
export default connect(mapStateToProps, {
    login_
  })(Login);