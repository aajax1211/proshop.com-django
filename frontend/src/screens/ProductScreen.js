
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, } from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";
import { useParams } from "react-router-dom";



export default function ProductScreen() {
    const [product, setProduct] = useState([])
    const {id} = useParams()
    useEffect(()=>{
        async function getProducts(){
            const response = await axios.get(`/api/products/${id}`)
            setProduct(response.data)
        }

        getProducts()
    },[id])
  return <div>
    <Link to='/' className="btn btn-light my-3"> {"<"} Go Back</Link>
    <Row>
        <Col md={6}>
        <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
        <ListGroup variant="flush">
            <ListGroup.Item>
                <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`}  color={'#f8e825'}/>
            </ListGroup.Item>
            <ListGroup.Item>
                Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
                Discription: {product.description}
            </ListGroup.Item>
        </ListGroup>
        </Col>
        <Col md={3}>
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Row>
                        <Col>
                        Price:
                        </Col>
                        <Col>
                        <strong>${product.price}</strong>
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>
                        Status:
                        </Col>
                        <Col>
                        {product.countInStock >0 ? 'In Stock': 'Out of Stock'}
                        </Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                
                    <Button className="w-100" disabled={product.countInStock === 0? true :false} type="button">Add to Cart</Button>
                    
                </ListGroup.Item>
            </ListGroup>
        </Card>
        </Col>
    </Row>
  </div>;
}
