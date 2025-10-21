import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import logo from "../../assets/images/lms.jpg";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { BsCart } from "react-icons/bs";
import {Link} from 'react-router-dom';

const Header = () => {
  //  // Use context - get data from context

  const { users, cart, logout, handleShowModal } =
    useContext(UserContext);

  // const [cartCount, setCartCount] = useState(0);

  // // Theo dõi sự thay đổi của localStorage
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const selectedItems = localStorage.getItem("mycart");
  //     const cart = selectedItems ? JSON.parse(selectedItems) : [];
  //     setCartCount(cart.length);
  //   };

  //   // Lần đầu component render
  //   handleStorageChange();

  //   // Lắng nghe sự kiện thay đổi của localStorage
  //   window.addEventListener("storage", handleStorageChange);

  //   // Dọn dẹp sự kiện khi component unmount
  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  return (
    <Navbar expand="lg" bg="white" className="border-bottom">
      <Container fluid>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto my-2 my-lg-0">
            <Nav.Link as={Link} to="/" className="fw-bold me-5">
              Home
            </Nav.Link>
            {/* <Link to="/">Home</Link> */}
            <Nav.Link as={Link} to="/introduction" className="fw-bold me-5">
              Introduction
            </Nav.Link>
            <Nav.Link as={Link} to="/courses" className="fw-bold me-5">
              Courses
            </Nav.Link>
            <Nav.Link href="#Mentor" className="fw-bold me-5">
              Mentors
            </Nav.Link>
            <Nav.Link href="#contact" className="fw-bold me-5">
              Contact
            </Nav.Link>
          </Nav>
          <div className="d-flex ms-auto">
            {users ? (
              <>
                <span className="me-3">Hello, {users.fullName}</span>
                <Button
                  variant="primary"
                  className="me-2 text-nowrap"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
              <Link className="me-2" to="/login">
                <Button
                  variant="outline-primary"
                  className="me-2 text-nowrap"
                  // onClick={login}
                >
                  Login
                </Button>
                </Link>
                <Button as={Link} to="/register" variant="primary" className="text-nowrap">
                  Sign Up
                </Button>
              </>
            )}
            <Button
              variant="outline-success"
              className="ms-2 text-nowrap"
              onClick={handleShowModal}
            >
              <BsCart className="mb-1 me-1" style={{ fontSize: "20px" }} />
              Show Cart ({cart.length})
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
