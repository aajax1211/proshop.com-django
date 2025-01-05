import React, { useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { getOrdersList } from "../actions/orderActions";


export default function OrderListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin



    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(getOrdersList())
        }else{
            navigate('/login')
        }

    },[dispatch, navigate, userInfo])


  return <div>
      <h1>Orders</h1>
      {loading ?(
        <Loader></Loader>
      ): error ? (
        <Message variant='danger'>{error}</Message>
      ):(
        <Table striped bordered hover responsive className="table-sm">
            <thead>
                <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>Price</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
                </tr>
                
            </thead>
            <tbody>
                {orders && orders.length > 0 ? 
                    (orders.map(order =>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid ? (
                                <Badge pill bg="success">Paid</Badge>
                            ):(
                                <Badge pill bg="warning">Pending</Badge>
                            )}</td>

                            <td>{order.isDelivered ? (
                                <Badge pill bg="info">Delivered</Badge>

                            ):(
                                <Badge pill bg="warning">Pending</Badge>
                            )}</td>
                            <td>
                                <Button as={Link} to={`/order/${order._id}`} variant='light' className="btn-sm">
                                    Details
                                </Button>
                            </td>
                        </tr>
                    ))):(
                        <tr>
                            <td colSpan='4'>No orders found</td>
                        </tr>
                    )}
            </tbody>
        </Table>
      )}
  </div>;
}
