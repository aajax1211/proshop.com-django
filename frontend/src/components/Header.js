import React from "react";
import { NavDropdown } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
import { clearCartOnLogOut } from "../actions/cartActions";


export default function Header() {
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()
  const logoutHandler = () =>{
    dispatch(logout())
    dispatch(clearCartOnLogOut())
  }

  return <div>
    <header>
    <Navbar expand="lg" bg="dark" variant="dark" data-bs-theme="dark" className="bg-body-tertiary" collapseOnSelect>
      <Container fluid>
      
          <Navbar.Brand as={Link} to='/'>ProShop</Navbar.Brand>
       
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
             
              <Nav.Link as={Link} to='/cart'>
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
              {userInfo ?(
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item to="/profile" as={Link}>Profile</NavDropdown.Item>
                  

                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ): (
                <Nav.Link as={Link} to='/login'>
                <i className="fas fa-user"></i> Login
              </Nav.Link>
              )}

              
            
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  </div>;
}
