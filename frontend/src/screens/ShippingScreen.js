import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ShippingScreen() {
    
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const {shippingAddress = {}} = cart
    const dispatch = useDispatch()
    const [address, setAddress] = useState(shippingAddress.address || "")
    const [city, setCity] = useState(shippingAddress.city || "")
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "")
    const [country, setCountry] = useState(shippingAddress.country || "")
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    React.useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else if(cart.cartItems.length === 0){
            navigate('/')
        }
    }, [navigate, userInfo, cart.cartItems]);
    

    const submitHandler =(e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    }
  return <FormContainer>
    <CheckoutSteps step1={true} step2={true} ></CheckoutSteps>
    <h1>Shipping</h1>
    <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control required
            type="text"
            placeholder="Enter address"
            value={address ? address: ""}
            onChange={(e) => setAddress(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control required
            type="text"
            placeholder="Enter city"
            value={city ? city: ""}
            onChange={(e) => setCity(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control required
            type="text"
            placeholder="Enter postal code"
            value={postalCode ? postalCode: ""}
            onChange={(e) => setPostalCode(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control required
            type="text"
            placeholder="Enter country"
            value={country ? country: ""}
            onChange={(e) => setCountry(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
            Continue
        </Button>
    </Form>
    </FormContainer>;
}
