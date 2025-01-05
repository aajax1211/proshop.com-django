import React, { useState } from "react";
import {Button, Form} from "react-bootstrap"
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchBox() {
    const [keyword, setKeyword] = useState('')
    let navigate = useNavigate()
    const location = useLocation()

    const submitHandler = (e) => {
    e.preventDefault()
    if(keyword){
        navigate(`/?keyword=${keyword}&page=1`)
    }else{
        navigate(location.pathname)
    }

    }

  return (
    <Form onSubmit={submitHandler} className="d-flex align-items-center">
        <Form.Control
        type="text"
        name="q"
        onChange={e=> setKeyword(e.target.value)}
        className="form-control me-1  ml-5"
        size="sm"
        placeholder="Search">
        </Form.Control>
        <Button type="submit" variant="outline-success" className=" p-1 ">
            <i className="fas fa-search"></i>
        </Button>
    </Form>
  );
}
