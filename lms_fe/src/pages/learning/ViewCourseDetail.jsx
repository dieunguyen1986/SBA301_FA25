import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  ListGroup,
  Button,
  Nav
} from "react-bootstrap";
import { FaPlayCircle, FaBell, FaFileAlt } from "react-icons/fa"; // Ví dụ icon từ react-icons
import { useNavigate, useParams } from "react-router-dom";

const ViewCourseDetail = () => {
  const { code } = useParams();

  const [course, setCource] = useState({
    code: "J100",
    title: "Java Core",
    duration: 3,
    price: 1500000,
    lecturer: "Nam",
    description: "Java SE Programming Language",
    completedLectures: 5, // Thuộc tính mới
    totalLectures: 10,
  });

  const navigate = useNavigate();

  const progress = (course.completedLectures / course.totalLectures) * 100;
  const latestLecture = { title: "Bài 5: Hướng dẫn sử dụng State", id: "5" };
  const announcements = [
    { text: "Lịch thi giữa kỳ đã được cập nhật.", date: "10/10/2023" },
    { text: "Nghỉ lễ 20/10, không có lớp học.", date: "15/10/2023" },
  ];
  const upcomingAssignment = {
    title: "Bài tập lớn - Thiết kế trang web",
    dueDate: "25/11/2023",
  };

  return (
    <Container className="my-5">

      {/* Tiêu đề khóa học */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title as="h1" className="mb-0">
            {course.title}
          </Card.Title>
          <Card.Text className="text-muted mt-2">
            Giảng viên: {course.lecturer}
          </Card.Text>
        </Card.Body>
      </Card>

      <Row>
        {/* Cột chính - Main Content (8/12 - 2/3 diện tích) */}
        <Col lg={8} className="mb-4">
          {/* Thanh tiến độ */}
          <Card className="mb-4">
            <Card.Body>
              <Card.Title as="h2">Tiến độ khóa học</Card.Title>
              <ProgressBar
                now={progress}
                label={`${Math.round(progress)}% hoàn thành`}
                className="mt-3"
              />
            </Card.Body>
          </Card>

          {/* Các Card thông tin */}
          <Row className="g-4">
            {/* Thẻ bài giảng mới nhất */}
            <Col md={4}>
              <Card className="h-100 bg-light">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Subtitle className="mb-2 text-muted">
                      Tiếp tục học
                    </Card.Subtitle>
                    <Card.Title>{latestLecture.title}</Card.Title>
                  </div>
                  <Button
                    variant="outline-primary"
                    href={`/courses/${course.code}/lectures/${latestLecture.id}`}
                    className="mt-3"
                  >
                    <FaPlayCircle className="me-2" /> Bắt đầu ngay
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Thẻ thông báo */}
            <Col md={4}>
              <Card className="h-100 bg-light">
                <Card.Body>
                  <Card.Title className="d-flex align-items-center">
                    <FaBell className="me-2 text-warning" /> Thông báo
                  </Card.Title>
                  <ListGroup variant="flush">
                    {announcements.map((ann, index) => (
                      <ListGroup.Item
                        key={index}
                        className="px-0 py-2 border-0 bg-transparent"
                      >
                        <div className="fw-bold">{ann.text}</div>
                        <small className="text-muted">{ann.date}</small>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>

            {/* Thẻ bài tập */}
            <Col md={4}>
              <Card className="h-100 bg-light">
                <Card.Body>
                  <Card.Title className="d-flex align-items-center">
                    <FaFileAlt className="me-2 text-danger" /> Bài tập sắp tới
                  </Card.Title>
                  <Card.Text>
                    <span className="fw-bold">{upcomingAssignment.title}</span>
                    <br />
                    <small className="text-muted">
                      Hạn nộp: {upcomingAssignment.dueDate}
                    </small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Cột phụ - Sidebar (4/12 - 1/3 diện tích) */}
        {/* <Col lg={4}>
          <Card>
            <Card.Body>

              <Card.Title as="h2">Nội dung khóa học</Card.Title>
              <ListGroup variant="flush">
                {course.modules.map(module => (
                  <ListGroup.Item key={module.id}>
                    <a href={`/courses/${course.code}/modules/${module.id}`} className="text-decoration-none text-dark">
                      <div className="fw-bold">{module.title}</div>
                      <small className="text-muted">({module.lectureCount} bài giảng)</small>
                    </a>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
    </Container>
  );
};

export default ViewCourseDetail;
