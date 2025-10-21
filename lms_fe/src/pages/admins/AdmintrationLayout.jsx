import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Col, Container, Row } from "react-bootstrap";

export const AdministrationLayout = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <AdminHeader />
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <AdminSidebar />
        </Col>
        <Col md={10}>
            <Outlet/>
        </Col>
      </Row>
    </Container>
  );
};
