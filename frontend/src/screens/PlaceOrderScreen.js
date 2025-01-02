import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Row, Col, ListGroup, Image,Card, Button} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from './../components/Message';
import formatCurrency from "../helpers/formatCurrency";

export default function PlaceOrderScreen() {
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
  const total = Number(cartItems.reduce((acc,item) => acc + item.qty *item.price, 0 ))
  const totalItems = Number(cartItems.reduce((acc,item) => acc + item.qty, 0 ))
  const shipping = Number(total > 100 ? 0 : 10)
  const tax = Number((0.13) * total)
  const final = Number(total + shipping + tax)
  let shippingPrice = formatCurrency(shipping)
  let formattedTotal = formatCurrency(total)
  let taxPrice = formatCurrency(tax)
  let finalPrice = formatCurrency(final)


  const placeOrder = () =>{
    console.log('orderplaced')
  }
  
  return <div>
    <CheckoutSteps step1={true} step2={true} step3={true} step4={true}/>
    <Row>
        <Col md={8}>
        <ListGroup variant="flush">
            <ListGroup.Item>
                <h2>Shipping</h2>

                <p>
                    <strong>Shipping : </strong>
                    {cart.shippingAddress.address} , {cart.shippingAddress.city}
                    {' '}
                    {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                </p>
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Payment Method</h2>

                <p> 
                    <strong>Method : </strong>
                    {cart.paymentMethod}
                </p>
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? <Message varient="info">
                    Your cart it empty
                </Message>: (
                    <ListGroup variant="flush">
                        {cart.cartItems.map((item,index) => (
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
                        <Col>Items :</Col>
                        <Col>{totalItems}</Col>
                    </Row>
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
                        <Col>{shippingPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Tax :</Col>
                        <Col>{taxPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Total Price :</Col>
                        <Col>{finalPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Button type="button" 
                    className="btn btn-primary w-100"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrder}>Place Order</Button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
        </Col>
    </Row>
  </div>;
}
