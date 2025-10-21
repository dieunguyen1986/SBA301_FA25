import React, { useContext } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { BsEyeFill, BsCartPlusFill, BsPencilSquare } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const CourseCard = ({ course, onHandleAction }) => {
  const location = useLocation();
  const path = location.pathname;
  const isLecturer = path.includes("lecturer") ? "LECTURER" : null;
  const isAdmin = path.includes("admin") ? "ADMIN" : null;
  const { users } = useContext(UserContext);

  console.log("Current user in CourseCard:", isLecturer, isAdmin, users);
  function handleClick() {
    onHandleAction(course);
  }
  return (
    <Card className="h-100 shadow-sm rounded-3 overflow-hidden">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start">
          <Card.Title
            className="text-truncate"
            style={{ fontWeight: "bold", maxWidth: "80%" }}
          >
            {course.title}
          </Card.Title>
          {/* Status badge */}
          {course.status && (
            <Badge bg={course.status === "PUBLISHED" ? "success" : "secondary"}>
              {course.status}
            </Badge>
          )}
        </div>

        <Card.Text className="mt-2">
          <span className="d-block text-muted small">
            Mã: {course.courseCode}
          </span>
          <span className="d-block text-muted small">
            Thời lượng: {course.duration}h
          </span>
          <span className="d-block text-muted small">
            Giảng viên: {course.lecturer?.fullName}
          </span>
        </Card.Text>

        <h5 className="mt-auto text-success fw-bold">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(course.price)}
        </h5>

        <div className="d-grid gap-2 mt-3">
          <Button
            variant="outline-primary"
            as={Link}
            to={`/courses/${course.courseCode}`}
            className="d-flex align-items-center justify-content-center"
          >
            <BsEyeFill className="me-2" />
            View Detail
          </Button>

          {/* Nếu là Guest/User thì hiển thị Add to Cart */}
          {!isLecturer && !isAdmin && (
            <Button
              variant="success"
              className="d-flex align-items-center justify-content-center"
              onClick={handleClick}
            >
              <BsCartPlusFill className="me-2" />
              Add to Cart
            </Button>
          )}

          {/* Nếu là Lecturer hoặc Admin thì hiển thị Edit */}
          {(isLecturer || isAdmin) && (
            <Button
              variant="warning"
              className="d-flex align-items-center justify-content-center"
              onClick={handleClick}
            >
              <BsPencilSquare className="me-2" />
              Edit Course ...
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
