import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Form, Button} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from "../components/FormContainer";
import { savePaymentMehod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";


export default function PaymentScreen() {

    
    const cart = useSelector(state => state.cart)
        const {shippingAddress = {}} = cart

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    if(!shippingAddress.address){
        navigate('/shipping')
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMehod(paymentMethod))
        navigate('/placeorder')
    }

  return <FormContainer>
    <CheckoutSteps step1={true} step2={true} step3={true}/> 
    <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
            <Form.Check type="radio" 
            label='Paypal or Credit Card' 
            id="paypal" 
            name="paymentMethod" 
            checked
            onChange={e=> setPaymentMethod(e.target.value)}>

            </Form.Check>
            </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
            Continue
        </Button>
    </Form>
    </FormContainer>;
}
