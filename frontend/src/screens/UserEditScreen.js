import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { getUserDetails, updateUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { USER_UPDATE_RESET } from "../constants/userConstants";

export default function UserEditScreen() {

    const {id:userId} = useParams()
        const  [name, setName] = useState('')
        const  [email, setEmail] = useState('')
        const [isAdmin, setIsAdmin] = useState(false)
        const dispatch = useDispatch()
        const navigate = useNavigate()
    

        const userDetails = useSelector(state => state.userDetails)
            const{error, loading, user} = userDetails

        const userUpdate = useSelector(state => state.userUpdate)
        const{error: updateError, loading: updateLoading, success: updateSuccess} = userUpdate
        
    
        useEffect(()=>{

            if(updateSuccess){
                dispatch({type: USER_UPDATE_RESET})
                navigate('/admin/userlist')
            }else{
                if(!user.name || user._id !== Number(userId)){
                    dispatch(getUserDetails(userId))
                }else {
                    setName(user.name)
                    setEmail(user.email)
                    setIsAdmin(user.isAdmin)
                }
            }
            
        },[userId, dispatch,user._id,user.name,user.email,user.isAdmin,updateSuccess])
    
        const submitHandler = (e) =>{
            e.preventDefault();
            if (user._id) {
                dispatch(updateUser({ id: user._id, name, email, isAdmin }));

            }
        }

  return <div>
        <Link to='/admin/userlist' className="btn btn-light my-3"> {"<"} Go Back</Link>
        <FormContainer>
            <h1>Edit User</h1>
            {updateLoading && <Loader></Loader>}
            {updateError && <Message>{updateError}</Message>}
                    {loading ? (
                        <Loader></Loader>
                    ): error ? (
                        <Message variant='danger'>{error}</Message>
                    ):(
                        <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                                        <Form.Label>
                                            Name
                                        </Form.Label>
                                        <Form.Control type='name' placeholder='Enter name' 
                                        value={name} onChange={(e)=> setName(e.target.value)}
                                        >
                                        </Form.Control>
                            </Form.Group>
                        <Form.Group controlId='email'>
                                        <Form.Label>
                                            Email Address
                                        </Form.Label>
                                        <Form.Control type='email' placeholder='Enter Email' 
                                        value={email} onChange={(e)=> setEmail(e.target.value)} >
                                        </Form.Control>
                            </Form.Group>
                        <Form.Group controlId='isAdmin'>
                                    
                                    <Form.Check type='checkbox' 
                                    label="isAdmin"
                                    checked={isAdmin} onChange={(e)=> setIsAdmin(e.target.checked)}>
                                        
                                    </Form.Check>
                            </Form.Group>
                        <Button type='submit' variant= 'primary'>Update</Button>
                    </Form>
                    ) }
                    
         </FormContainer>;
    </div>
}
