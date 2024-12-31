import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className="checkout-steps justify-content-center mb-4">
      <Nav.Item className={`step ${step1 ? "completed" : ""}`}>
        {step1 ? (
          
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
         
        ) : (
          <Nav.Link disabled>Login</Nav.Link>
        )}
        <div className={`line ${step1 ? "completed" : ""}`}></div>
      </Nav.Item>

      <Nav.Item className={`step ${step2 ? "completed" : ""}`}>
        {step2 ? (
          
            <Nav.Link as={Link} to="/shipping">Shipping</Nav.Link>
          
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
        <div className={`line ${step2 ? "completed" : ""}`}></div>
      </Nav.Item>

      <Nav.Item className={`step ${step3 ? "completed" : ""}`}>
        {step3 ? (
          
            <Nav.Link as={Link} to="/payment">Payment</Nav.Link>
          
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
        <div className={`line ${step3 ? "completed" : ""}`}></div>
      </Nav.Item>

      <Nav.Item className={`step ${step4 ? "completed" : ""}`}>
        {step4 ? (
          
            <Nav.Link as={Link} to="/placeorder">Place Order</Nav.Link>
          
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
        <div className={`line ${step4 ? "completed" : ""}`}></div>
      </Nav.Item>
    </Nav>
  );
}
