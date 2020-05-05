import React, { Fragment } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const token = sessionStorage.getItem("jwtToken");
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>
        <a href="/" style={{ color: "white" }}>
          Tiny
        </a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {!token ? (
            <Fragment>
              <Nav.Link as={Link} to="/login" href="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register" href="/register">
                Register
              </Nav.Link>
            </Fragment>
          ) : (
            <Fragment>
              <Nav.Link as={Link} to="/articles/new" href="/articles/new">
                Write
              </Nav.Link>
              <Nav.Link as={Link} to="/dashboard" href="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/logout" href="/logout">
                Log Out
              </Nav.Link>
            </Fragment>
          )}
          {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
  </NavDropdown>*/}
        </Nav>

        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2 mb-2"
          />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {})(Header);
