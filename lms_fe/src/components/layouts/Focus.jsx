import { Container, Row, Col } from "react-bootstrap";
import team from "../../assets/images/team.webp";
import { ListGroup } from "react-bootstrap";
import { BsChatLeftDots, BsLaptop, BsGraphUpArrow } from "react-icons/bs";

const Focus = () => {
  return (
     <Container className="my-5 py-5">
      <Row className="align-items-center">
        {/* Text content */}
        <Col md={6} className="mb-4 mb-md-0">
          <h1 className="fw-bold mb-3">Solution for Business Owners</h1>
          <h2 className="fw-semibold text-black-50 mb-4">
            Effortless Collaboration with a Custom-Trained AI — 
            Like Your Best Agency, 24/7
          </h2>
          <h3 className="fw-bold mb-4">How It Works</h3>

          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center">
              <BsChatLeftDots size={28} className="me-3 text-primary" />
              <span className="fw-bold">1. Describe Your Business</span>
            </div>
            <div className="d-flex align-items-center">
              <BsLaptop size={28} className="me-3 text-success" />
              <span className="fw-bold">2. AI Builds and Optimizes Website</span>
            </div>
            <div className="d-flex align-items-center">
              <BsGraphUpArrow size={28} className="me-3 text-danger" />
              <span className="fw-bold">3. Watch Your Business Grow</span>
            </div>
          </div>
        </Col>

        {/* Image */}
        <Col md={6} className="text-center">
          <img
            src={team}
            alt="Focus on What Matters Most"
            className="img-fluid rounded shadow-lg"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Focus;
