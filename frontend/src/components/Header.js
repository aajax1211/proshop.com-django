import React from "react";

import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function Header() {
  return <div>
    <header>
        <NavScrollExample>

        </NavScrollExample>
    </header>
  </div>;
}

function NavScrollExample() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" data-bs-theme="dark" className="bg-body-tertiary" collapseOnSelect>
      <Container fluid>
        <Navbar.Brand href="/">ProShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
