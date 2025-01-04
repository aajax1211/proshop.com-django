import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Table, Button, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { getUserList } from "../actions/userActions";


export default function UserListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(getUserList())
        }else{
            navigate('/login')
        }

    },[dispatch, navigate, userInfo])

    const deleteHandler = (id) => {
        console.log('delete', id)
    }

  return <div>
      <h1>Users:</h1>
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
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
                </tr>
                
            </thead>
            <tbody>
                {users && users.length > 0 ? 
                    (users.map(user =>(
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? (
                                <i className="fas fa-check" style={{color: 'green'}}></i>
                            ):(
                                <i className="fas fa-check" style={{color: 'red'}}></i>
                            )}</td>
                            <td>
                                <Button as={Link} to={`/admin/user/${user._id}`} variant='light' className="btn-sm">
                                    <i className="fas fa-edit"></i>
                                </Button>

                                <Button variant="danger" className="btn-sm" onClick={()=>deleteHandler(user._id)}>
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
  </div>;
}
