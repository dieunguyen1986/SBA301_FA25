import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Breadcrumb,
} from "react-bootstrap";
import { PlusCircle, PencilSquare, Trash } from "react-bootstrap-icons";
import CourseCard from "../../components/common/CourseCard";
import { Link } from "react-router-dom";
import courseManagementApi from "../../api/admin/courseManagementApi";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {

    console.log("Show course list content...");

    document.title = "My Courses Management";
    
    async function getAllBySpecLecturer(){
      try {
        const data = await courseManagementApi.getAll();

        setCourses(data);
      } catch (error) {
        console.log(error.message || "Fetch course is fail!");
      }
    };

    getAllBySpecLecturer();
  }, []);


  function handleEdit(){
    console.log("Editing...")
  }

  return (
    <Container fluid className="p-4">
      {/* Breadcrumb (Đường dẫn) */}
      <Breadcrumb>
        <Breadcrumb.Item href="#">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>Quản lý Khóa học</Breadcrumb.Item>
      </Breadcrumb>

      {/* Header và nút Thêm mới */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Danh sách Khóa học</h2>
        <Button as={Link} to="/lecturer/courses/new" variant="success" className="d-flex align-items-center">
          <PlusCircle className="me-2" />
          Add new Course
        </Button>
      </div>

      <Row>
        {courses.map((course) => (
          <Col md={3} className="mb-3" key={course.id}>
            <CourseCard course={course} onHandleAction={handleEdit} />
          </Col>
        ))}
      </Row>

      

    </Container>
  );
};

export default CourseManagement;
