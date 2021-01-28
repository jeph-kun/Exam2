import React from "react";
import "./Navigation.css";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter } from "react-router";

const Navigation = (props) => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">
          <img
            src={"img/shopping-cart.png"}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          &nbsp;&nbsp;&nbsp;ECOMMERCE APP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto justify-content-end">
            <Nav.Link onClick={() => props.history.push("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => props.history.push("/cart")}>
              Cart
            </Nav.Link>
            <Nav.Link onClick={() => props.history.push("/addproduct")}>
              Add Product
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link>HELLO JEPH</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

const NavigationWithRouter = withRouter(Navigation);
export default NavigationWithRouter;
