import { Container, Row, Col, Button } from "react-bootstrap";

const Adverisment = () => {
  return (
     <div className="bg-light py-3" style={{ height: "130px"}}>
      <Container fluid className="h-100 my-auto">
        {/* Bỏ Col, đặt nội dung trực tiếp vào Row */}
        <Row className="justify-content-center align-items-center h-100 text-center">
          <div>
            <h2 className="mb-0">Looking for a website? We can help!</h2>
            <p className="mb-0">Get a custom website tailored to your business needs.</p>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Adverisment;