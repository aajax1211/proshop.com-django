import React, { useEffect} from "react";
import {  useParams } from "react-router-dom";
import {Row, Col, ListGroup, Image,Card} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Message from './../components/Message';
import formatCurrency from "../helpers/formatCurrency";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import Loader from './../components/Loader';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

export default function OrderScreen() {
    const {id: orderId} = useParams()
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay} = orderPay

    let total = 0;
    if(!loading && !error){
     total = Number(order.orderItems.reduce((acc,item) => acc + item.qty *item.price, 0 ))
    }
  
    const formattedTotal = formatCurrency(total)

    
  useEffect(()=>{
    if(!order || successPay || order._id !== Number(orderId)){
        dispatch({type: ORDER_PAY_RESET})
        dispatch(getOrderDetails(orderId))
    }
  },[order, orderId,dispatch, successPay])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  if(error || !order){
    return <div>
        <h2 variant='danger'>Order not Found</h2>
        <Link to='/' className="btn btn-light my-3"> {"<"} Go Back</Link>
    </div>
  }


  return loading ? <Loader></Loader> : error ? (
    <Message variant='danger'>{error}</Message>
  ):
  (
  <div>
    <Link to='/profile' className="btn btn-light my-3"> {"<"} Go Back</Link>
    <h1>Order : {order._id}</h1>
    <Row>
        <Col md={8}>
        <ListGroup variant="flush">
            <ListGroup.Item>
                <h2>Shipping</h2>
                <p><strong>Name: </strong>{order.user.name}</p>
                    <p><strong>Email: </strong>{order.user.email}</p>
                <p>
                    <strong>Shipping : </strong>
                    {order.shippingAddress.address} , {order.shippingAddress.city}
                    {' '}
                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>

                {order.isDelivered ? <Message variant='success'> Delivered on: {order.deliveredAt}</Message>:
                (
                    <Message variant='warning'>Not Delivered</Message>
                )}
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Payment Method</h2>

                <p> 
                    <strong>Method : </strong>
                    {order.paymentMethod}
                </p>
                {order.isPaid ? <Message variant='success'> Paid on: {order.paidAt}</Message>:
                (
                    <Message variant='warning'>Not Paid</Message>
                )}
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? <Message varient="info">
                    Order is empty
                </Message>: (
                    <ListGroup variant="flush">
                        {order.orderItems.map((item,index) => (
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                                    </Col>

                                    <Col>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={4}>
                                        {item.qty} X ${item.price} = {formatCurrency(item.qty * item.price)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                        
                    </ListGroup>
                )}
            </ListGroup.Item>
        </ListGroup>
        </Col>

        <Col md={4}>
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Order Summary</h2>
                </ListGroup.Item>


                <ListGroup.Item>
                    <Row>
                        <Col>Price : </Col>
                        <Col>{formattedTotal}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Shipping :</Col>
                        <Col>{formatCurrency(order.shippingPrice)}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Tax :</Col>
                        <Col>{formatCurrency(order.taxPrice)}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Total Price :</Col>
                        <Col>{formatCurrency(order.totalPrice)}</Col>
                    </Row>
                </ListGroup.Item>
                

                {!order.isPaid && (
            <ListGroup.Item>
                {loadingPay && <Loader />}
                <PayPalScriptProvider
                    options={{
                        "client-id": "AbgF0MOMEPHX9cFJKiVU5jhgx3EM7gHuzGZqVIjNSKvTaEWGAkFQI53MytvtQ4Y3IHMFrmUmASNBKRh_",
                        currency: "USD",
                    }}
                >
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: order.totalPrice.toString(),
                                            currency_code: "USD"
                                        },
                                        description: `Order #${order._id}`
                                    }
                                ]
                            });
                        }}
                        onApprove={async (data, actions) => {
                            const details = await actions.order.capture();
                            successPaymentHandler({
                                id: details.id,
                                status: details.status,
                                update_time: details.update_time,
                                payer: details.payer
                            });
                        }}
                        onError={(err) => {
                            console.error("PayPal Error:", err);
                        }}
                        style={{
                            layout: "vertical",
                            color: "gold",
                            shape: "rect",
                            label: "pay"
                        }}
                    />
                </PayPalScriptProvider>
            </ListGroup.Item>
        )}

            </ListGroup>
        </Card>
        </Col>
    </Row>
  </div>
  )
}
