import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from 'axios';

export default function HomeScreen() {
  const [products, setProducts] = useState([])

  useEffect(()=>{
    async function fetchData(){
   const response = await axios.get('/api/products/')
   setProducts(response.data)
  }
  fetchData();
  },[])
  return <div>
    <h1>Latest Products</h1>
    <Row>
        {products.map(product =>(
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}></Product>
            </Col>
        ))}
    </Row>
  </div>;
}
