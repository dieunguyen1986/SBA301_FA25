import { Col, Row, Container, Form, Button } from "react-bootstrap";
const SideBar = () => {
  return (
    <Container>
      <Form className="mb-3 mt-3">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fs-6">Title</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Java Core..." />
            </Form.Group>
            <Form.Select size="sm">
              <option selected>All</option>
              <option>Technical</option>
              <option>Business</option>
            </Form.Select>
            <Button className="mt-3" variant="info">
              Search
            </Button>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fs-6">Lecturer</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Nguyen Van A" />
            </Form.Group>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Check this switch"
            />
          </Col>
        </Row>
      </Form>
      <hr />
    </Container>
  );
};

export default SideBar;
