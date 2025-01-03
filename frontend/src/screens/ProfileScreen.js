import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from "react-bootstrap";

import { useDispatch, useSelector } from 'react-redux';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { getMyOrdersList } from "../actions/orderActions";

export default function ProfileScreen() {
    const  [name, setName] = useState('')
    const  [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const{error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const{userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const{success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {error:errorOrder, loading:loadingOrder, orders} = orderListMy

    useEffect(()=>{
                if(!userInfo){
                    navigate('/login')
                }else{
                    if(!user || !user.name || success){
                        dispatch({ type: USER_UPDATE_PROFILE_RESET });
                        dispatch(getUserDetails('profile'))
                        dispatch(getMyOrdersList())
                    }else{
                        setName(user.name)
                        setEmail(user.email)
                    }
                }
            },[dispatch,navigate,userInfo, user, success])
        
            const submitHandler = (e) =>{
                e.preventDefault();
    
                if(password !== confirmPassword){
                    setMessage('Passwords do not match')
                    setName(user.name)
                }else{
                    dispatch(updateUserProfile({
                        'id':user._id,
                        'name': name,
                        'email': email,
                        'password': password,
                    }))
                    setMessage('')
                }
                
            }
    
  return <Row>
    <Col md={3}>
    <h2>User Profile</h2>
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
                                value={password} onChange={(e)=> setPassword(e.target.value)} >
                                    
                                </Form.Control>
                        </Form.Group>
                    <Form.Group controlId='passwordConfirm'>
                                    <Form.Label>
                                        Confirm Password
                                    </Form.Label>
                                    <Form.Control type='password' placeholder='Confirm Password' 
                                    value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} >
                                        
                                    </Form.Control>
                        </Form.Group>
                    <Button type='submit' variant= 'primary'>Update</Button>
                </Form>
    </Col>
    <Col md={9}>
    <h2>My Orders</h2>
    {loadingOrder ? (
        <Loader></Loader>
    ): errorOrder ? (
        <Message variant='danger'>
            {errorOrder}
        </Message>
    ):(
        <Table striped responsive className="table-sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {orders.map(order => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0,10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.isPaid ? 'Paid' : 'Pending'}</td>
                        <td>{order.isDelivered ? 'Delivered' : 'Pending'}</td>
                        <td>
                            <Button as={Link} to={`/order/${order._id}`} className="btn-sm">Details</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )}
    </Col>
    </Row>;
}
