
import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useParams, useNavigate } from "react-router-dom";
import { listProductDetails, createProductReview } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productconstants";



export default function ProductScreen() {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')



    const navigate = useNavigate()
    const {id} = useParams()
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error , product} = productDetails
      

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {loading: loadingProductReview, 
        error: errorProductReview , 
        success: successProductReview
    } = productReviewCreate

    useEffect(()=>{
        if(successProductReview){
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET })
        }
         dispatch(listProductDetails(id))
    },[dispatch,id, successProductReview])

    const addToCartHandler = () =>{
        navigate(`/cart/${id}?qty=${qty}`);
    }
    
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(createProductReview(
            id,
            {
                rating,
                comment
            }
        ))
    }


  return <div>
    <Link to='/' className="btn btn-light my-3"> {"<"} Go Back</Link>

    {loading ? 
    <Loader></Loader>: error ? <Message variant="danger">{error}</Message>:
    (
        <div>
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
                        {product.countInStock > 0 ? 'In Stock': 'Out of Stock'}
                        </Col>
                    </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                    <ListGroup.Item>
                        <Row>
                            <Col>Qty:</Col>
                            <Col xs="auto" className="my-1">
                                <Form.Control as ="select"
                                value={qty} onChange={(e) => setQty(e.target.value)}>

                                    {
                                        [...Array(product.countInStock).keys()].map((x)=>(
                                            <option key={x+1} value={x+1}>
                                                {x + 1}
                                            </option>
                                        ))
                                    }
                                </Form.Control>
                            </Col>
                            
                        </Row>
                    </ListGroup.Item>
                ) }

                <ListGroup.Item>
                
                    <Button 
                        onClick={addToCartHandler}
                        className="w-100" 
                        disabled={product.countInStock === 0 ? true :false} 
                        type="button"
                    >Add to Cart</Button>
                    
                </ListGroup.Item>
            </ListGroup>
        </Card>
        </Col>
    </Row>
    <Row>
        <Col md={6}>
        <h4>Reviews</h4>
        {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

        <ListGroup variant="flush">
            {product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color='#f8e825'></Rating>
                    <p>{review.createdAt.substring(0,10)}</p>
                    <p>{review.comment}</p>
                </ListGroup.Item>
            ))}

            <ListGroup.Item>
                <h4>Write a review</h4>
                {loadingProductReview && <Loader></Loader>}
                {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                {successProductReview && <Message variant='success'>Rview Submitted</Message>}
                {userInfo ? (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control as='select'
                            value={rating}
                            onChange={e=>setRating(e.target.value)} required >
                                <option value="" key="">Select...</option>
                                <option value="1" key="">1 - Poor</option>
                                <option value="2" key="">2 - Fair</option>
                                <option value="3" key="">3 - Good</option>
                                <option value="4" key="">4 - Very Good</option>
                                <option value="5" key="">5 - Excellent</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment" >
                            <Form.Label>Review</Form.Label>
                            <Form.Control
                            as='textarea'
                            rows="5"
                            value={comment}
                            onChange={e=> setComment(e.target.value)} required>

                            </Form.Control>
                            <Button type="submit" disabled={loadingProductReview} 
                            variant="primary" >Submit</Button>
                        </Form.Group>
                    </Form>
                ):(
                    <Message variant='info'>
                        PLease <Link to='/login'>login</Link> to write a review.
                    </Message>
                )}
            </ListGroup.Item>
        </ListGroup>
        </Col>
    </Row>
    </div>
    ) }
    
  </div>;
}
