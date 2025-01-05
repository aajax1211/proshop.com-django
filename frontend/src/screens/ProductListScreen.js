import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { createProduct, deleteProduct, listProducts } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productconstants";
import Paginate from "../components/Paginate";


export default function UserListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    

    const productList = useSelector(state => state.productList)
    const {loading, error, products, pages , page} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading:loadingDelete, error: errorDelete, success: successDelete} = productDelete


    const productCreate = useSelector(state => state.productCreate)
    const {loading:loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const keyword = new URLSearchParams(location.search).get("keyword") || "";
    const currentPage = new URLSearchParams(location.search).get("page") || 1
    useEffect(()=>{
        dispatch({type: PRODUCT_CREATE_RESET})
        
        if(!userInfo.isAdmin){
            navigate('/login')
        }

        if(successCreate){
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }else {
            
            dispatch(listProducts(keyword,currentPage))
        }

    },[dispatch, navigate, successCreate, userInfo.isAdmin, successDelete, currentPage])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this product?')){
            dispatch(deleteProduct(id))
        }
        
    }

    const createProductHandler = () =>{
        dispatch(createProduct())
    }

  return <div>
    
      <Row className="align-items-center">
        <Col>
        <h1>Products</h1>
        </Col>
        <Col className="text-end">
        <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i>Create Product
        </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader></Loader>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader></Loader>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ?(
        <Loader></Loader>
      ): error ? (
        <Message variant='danger'>{error}</Message>
      ):(
        <Table striped bordered hover responsive className="table-sm">
            <thead>
                <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>Price</th>
                <th>BRAND</th>
                <th>CATEGORY</th>
                <th></th>
                </tr>
                
            </thead>
            <tbody>
                {products && products.length > 0 ? 
                    (products.map(product =>(
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.brand}</td>
                            <td>{product.category}</td>
                            
                            <td>
                                <Button as={Link} to={`/admin/product/${product._id}/edit`} variant='light' className="btn-sm">
                                    <i className="fas fa-edit"></i>
                                </Button>

                                <Button variant="danger" className="btn-sm" onClick={()=>deleteHandler(product._id)}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))):(
                        <tr>
                            <td colSpan='4'>No user found</td>
                        </tr>
                    )}
            </tbody>
        </Table>
      )}
      <Paginate page={page} pages={pages} isAdmin={true}></Paginate>
  </div>;
}
