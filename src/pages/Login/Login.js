import React, { useState, useRef, useEffect } from 'react';
import './Login.css';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { login_ } from "../../actions/auth";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import Loading from '../../components/Loading';

const Login = (props) => {

    
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          email: "",
          password: ""
        }
      });

    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.auth);
    const [isLoading, setLoading] = useState(false);

    const onSubmit =  (e) => {
        setLoading(!isLoading);
        dispatch(login_(e.email, e.password)).then((response) => {
            if(!response){
                setLoading(!isLoading);
                props.history.push("/barang");
                window.location.reload();
            }else{
                setLoading(!isLoading);
                // error login
                // props.history.push("/barang");
                // window.location.reload();
            } 
        });
    }

    useEffect(() => {
        // setLoading(false);
        return () => {
            
        };
    },[isLoading]);
    // if (isLoggedIn) {
    //     return <Redirect to="/dashboard" />;
    // }

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

export default Login;