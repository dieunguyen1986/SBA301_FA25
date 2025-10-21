import React from "react";
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Nav,
  Button,
  Dropdown,
} from "react-bootstrap";
import { Search, Bell, PersonCircle } from "react-bootstrap-icons";
import UserContext from "../../components/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/contexts/UserProvider";
import auth from "../../api/auth";

const AdminHeader = ({ onSearch }) => {
  const { users, logout } = useAuth();
  const navigate = useNavigate(); // Sử dụng hook useNavigate

  const handleLogout = async () => {
    try {
      await auth.logout();

      logout();
    } catch (error) {
      console.log("Fail call logout to server");
    }
  };
  return (
    <Navbar
      bg="light"
      variant="light"
      className="py-3 px-4 border-bottom shadow-sm"
    >
      <Container fluid className="px-0">
        <Navbar.Brand href="#home" className="fw-bold fs-4 text-info">
          LMS Admin
        </Navbar.Brand>

        {/* Search Bar */}
        <div className="d-flex align-items-center ms-auto me-4">
          <Form className="d-flex">
            <div className="input-group">
              <FormControl
                type="search"
                placeholder="Tìm kiếm..."
                className="border-0 bg-light-subtle rounded-start"
                aria-label="Search"
                style={{ minWidth: "250px" }}
                onChange={onSearch}
              />
              <Button
                variant="light"
                className="border-0 bg-light-subtle rounded-end text-muted"
              >
                <Search size={18} />
              </Button>
            </div>
          </Form>
        </div>

        {/* Right-aligned icons */}
        <Nav className="d-flex align-items-center">
          <Nav.Link
            href="#notifications"
            className="position-relative me-3 text-dark"
          >
            <Bell size={22} />
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.6em" }}
            >
              3<span className="visually-hidden">unread messages</span>
            </span>
          </Nav.Link>
          {users ? (
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                className="border-0 bg-light-subtle text-dark d-flex align-items-center"
              >
                <PersonCircle size={32} className="text-secondary" />
                <span className="ms-2 d-none d-lg-inline">
                  Welcome, {users.email}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                <Dropdown.Item href="#profile">Profile</Dropdown.Item>
                <Dropdown.Item href="#settings">Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AdminHeader;
