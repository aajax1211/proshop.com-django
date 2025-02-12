import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

export default function RegisterScreen() {
        const  [name, setName] = useState('')
        const  [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [confirmPassword, setConfirmPassword] = useState('')
        const [message, setMessage] = useState('')
        const location = useLocation()
        const navigate = useNavigate()
        const userRegister = useSelector(state => state.userRegister)
        const{error, loading, userInfo} = userRegister


        const redirect = location.search ? location.search.split('=')[1]: '/'
        const dispatch = useDispatch()
    
        useEffect(()=>{
            if(userInfo){
                navigate(redirect)
            }
        },[navigate,userInfo, redirect])
    
        const submitHandler = (e) =>{
            e.preventDefault();

            if(password !== confirmPassword){
                setMessage('Passwords do not match')
            }else{
                dispatch(register(name,email, password))
            }
            
        }
  return <FormContainer>
    <h1>Sign In</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
                 <Form.Group controlId='name'>
                                <Form.Label>
                                    Name
                                </Form.Label>
                                <Form.Control type='name' placeholder='Enter name' 
                                value={name} onChange={(e)=> setName(e.target.value)} required>
                                </Form.Control>
                    </Form.Group>
                <Form.Group controlId='email'>
                                <Form.Label>
                                    Email Address
                                </Form.Label>
                                <Form.Control type='email' placeholder='Enter Email' 
                                value={email} onChange={(e)=> setEmail(e.target.value)} required>
                                </Form.Control>
                    </Form.Group>
                <Form.Group controlId='password'>
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control type='password' placeholder='Enter Password' 
                            value={password} onChange={(e)=> setPassword(e.target.value)} required>
                                
                            </Form.Control>
                    </Form.Group>
                <Form.Group controlId='passwordConfirm'>
                                <Form.Label>
                                    Confirm Password
                                </Form.Label>
                                <Form.Control type='password' placeholder='Confirm Password' 
                                value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} required>
                                    
                                </Form.Control>
                    </Form.Group>
                <Button type='submit' variant= 'primary'>Register</Button>
            </Form>

            <Row className="py-3">
                        <Col>
                         Already an existing user? <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}>Sign In</Link>
                        </Col>
                </Row>
    </FormContainer>;
}
