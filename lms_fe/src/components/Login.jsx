import {useContext, useState } from "react";
import "../styles/Login.css";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import auth from "../api/auth";
import { jwtDecode } from "jwt-decode";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { setUserContext } = useContext(UserContext);

  const navigate = useNavigate(); // Sử dụng hook useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setIsSuccess(false);

    try {
      const userRequest = { email, password };
      const response = await auth.login(userRequest);

      const header =
        response.headers["Authorization"] || response.headers["authorization"];

      const accessToken = header
        ? header.replace("Bearer ", "")
        : response.data.accessToken;

      //const refreshToken = response.data.refreshToken;

      if (!accessToken) {
        throw new Error("Missing token in response");
      }

      localStorage.setItem("accessToken", accessToken);
      //localStorage.setItem("refreshToken", refreshToken);

      console.log("Login successful:", accessToken, response.data.refreshToken);

      const decodedToken = jwtDecode(accessToken);

      const userExtracted = {
        email: decodedToken.sub,
        roles: decodedToken.roles,
      };
      // Store user to context
      console.log("User extracted from token:", userExtracted);
      setUserContext(userExtracted);

      setIsSuccess(true);
      setMessage("Đăng nhập thành công! Đang chuyển hướng...");


      // Chuyển hướng người dùng sau khi đăng nhập thành công
      // Trong trường hợp này, chúng ta sẽ chuyển hướng đến đường dẫn gốc '/'
      const roles = decodedToken.roles || [];

      console.log("Login - User roles:", roles.includes("ROLE_ADMIN"));

      if (roles.includes("ROLE_ADMIN")) {
        navigate("/admin");
      } else if (roles.includes("ROLE_LECTURER")) {
        navigate("/lecturer");
      }
       else {
        navigate("/");
      }
    } catch (error) {
      setMessage(error.message || "Đã xảy ra lỗi không xác định.");
      setIsSuccess(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="login-box p-4 shadow-lg rounded">
        <h3 className="text-center mb-4">LOGIN</h3>

        {message && (
          <Alert variant={isSuccess ? "success" : "danger"}>{message}</Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Check type="checkbox" label="Remember me" />
            </Col>
            <Col className="text-end">
              <a href="#forgot-password">Forgot password?</a>
            </Col>
          </Row>

          <div className="d-grid gap-2 mb-3">
            <Button variant="primary" type="submit" size="lg">
              Login
            </Button>
          </div>
        </Form>

        <div className="divider-or mb-3">
          <span>or</span>
        </div>

        <div className="d-grid gap-2 mb-3">
          <Button
            variant="outline-primary"
            size="lg"
            className="d-flex align-items-center justify-content-center"
          >
            <FaGoogle className="me-2" /> Login with Google
          </Button>
        </div>

        <div className="text-center mt-3">
          No account yet? <Link to="/register">Register now</Link>
        </div>
      </div>
    </Container>
  );
};
