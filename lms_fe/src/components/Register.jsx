import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import Link từ react-router-dom
import { registerSchema } from "../utils/validationSchemas/registerSchema";
import auth from "../api/auth";

const Register = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
  });

  // onChange ={(e)=> {setUser({...user, email: e.target.value})}}
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (user.password !== confirmPassword) {
    //   setMessage("Password and confirm password do not match.");
    //   setIsSuccess(false);
    //   return;
    // }
    const validationErrors = registerSchema(user);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const data = await auth.registerUser(user);
        setMessage(data.message || "Registration successful! Please login.");
        setIsSuccess(true);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        setMessage(error.message || "Registration failed. Please try again.");
        setIsSuccess(false);
      }ßß
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card
        className="shadow-lg p-4"
        style={{ maxWidth: "700px", width: "100%" }}
      >
        <Card.Body>
          <h2 className="text-center mb-4 text-primary fw-bold">
            Create a new account
          </h2>
          {message && (
            <Alert variant={isSuccess ? "success" : "danger"}>{message}</Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="userName"
                    placeholder="Enter username"
                    value={user.userName}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.userName && <p style={{color:"red"}}>{errors.userName}</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={user.fullName}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.fullName && <p style={{color: "red"}}>{errors.fullName}</p>}
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={user.email}
                    onChange={handleInputChange}
                    required
                  />

                  {errors.email && <p style={{color: "red"}}>{errors.email}</p>}
                </Form.Group>

              </Col>
              <Col md={6}>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={user.password}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.password && <p style={{color: "red"}}>{errors.password}</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    value={user.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />

                  {errors.confirmPassword && <p className="fs-6" style={{color: "red"}}>{errors.confirmPassword}</p>}
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid gap-2 mt-4">
              <Button variant="primary" type="submit" className="fw-bold">
                Register
              </Button>
            </div>
          </Form>
        </Card.Body>
        <Card.Footer className="text-center bg-transparent border-0 mt-3">
          Already have an account? <Link to="/login">Login here</Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Register;
