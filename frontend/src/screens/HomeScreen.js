import React, { useEffect} from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useLocation } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";


export default function HomeScreen() {
  const dispatch = useDispatch()
  const location = useLocation()
  const productList = useSelector(state => state.productList)
  const {error, loading , products, page , pages} = productList

  const keyword = new URLSearchParams(location.search).get("keyword") || "";
  const currentPage = new URLSearchParams(location.search).get("page") || 1;

  useEffect(()=>{
    dispatch(listProducts(keyword,currentPage))
  },[dispatch,keyword,currentPage])

  
  return <div>
    {!keyword &&  <ProductCarousel></ProductCarousel> }
    {!keyword ? <h1>Latest Products</h1> : <h1>Search Results</h1> }
    
    {loading ? <Loader></Loader>: error ? <Message  variant ="danger">{error}</Message>: 
    <div><Row>
    {products.map(product =>(
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
        <Product product={product}></Product>
        </Col>
    ))}
</Row>
<Paginate page={page} pages={pages} keyword={keyword}></Paginate>
</div>}
    
  </div>;
}
