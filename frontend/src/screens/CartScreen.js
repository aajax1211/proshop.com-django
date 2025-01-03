import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from './../components/Message';
import { addToCart, removeFromCart } from './../actions/cartActions';
import formatCurrency from "../helpers/formatCurrency";

export default function CartScreen() {
  const {id:productId} = useParams()
  const navigate = useNavigate()

  const location = useLocation()
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  const total = cartItems.reduce((acc,item) => acc + item.qty *item.price, 0 )
  
  let formattedTotal = formatCurrency(total)

  useEffect(()=>{
    if(productId && qty > 0){
      dispatch(addToCart(productId,qty))
    }else{
      console.log("Invalid productId  or quanity")
    }
  },[dispatch,productId,qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkOutHandler = () => {
    
    navigate('/login?redirect=/shipping')
  }

  return <Row>
    <Col md={8}>
       <h1>Shopping Cart</h1>
       {cartItems.length === 0 ? (
        <Message variant='info'>
          Your Cart is Empty <Link to='/'>Go Back</Link>
        </Message>
       ): (
        <ListGroup variant="flush">
          {cartItems.map(item =>(
            <ListGroup.Item key={item.product}>
              <Row>
                <Col md={2}>
                <Image src={item.image} alt="{item.name}" fluid rounded>
                </Image>
                </Col>
                <Col md={3} variant="flush">
                <Link to={`/product/${productId}`} className="text-decoration-none ">{item.name}</Link>
                </Col>
                <Col md={2}>
                ${item.price}
                </Col>
                <Col md={3}>
                <Form.Control as ="select"
                                value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>

                                    {
                                        [...Array(Math.max(item.countInStock, 0)).keys()].map((x)=>(
                                            <option key={x+1} value={x+1}>
                                                {x + 1}
                                            </option>
                                        ))
                                    }
                                </Form.Control>
                </Col>

                <Col md={1}>
                <Button type="button"
                 variant="light"
                 onClick={()=> removeFromCartHandler(item.product)}>
                  <i className="fas fa-trash"></i>
                 </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
       )}
    </Col>

    <Col md={4}>
       <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Subtotal({cartItems.reduce((acc,item) => acc + item.qty, 0 )}) items</h2>
            {formattedTotal}
          </ListGroup.Item>

          <ListGroup.Item>
            <Button
              type="button"
              className="btn-block w-100"
              disabled={cartItems.length === 0}
              onClick={checkOutHandler}>
                Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
       </Card>
    </Col>
    </Row>;
}
