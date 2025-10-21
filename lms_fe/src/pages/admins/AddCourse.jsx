import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Breadcrumb,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { lecturerApi } from "../../api/lecturer/lecturerApi";
import courseManagementApi from "../../api/admin/courseManagementApi";
import { useAuth } from "../../components/contexts/UserProvider";
import { categoryApi } from "../../api/admin/categoryApi";

const AddCourse = () => {
  const [fetchErrors, setFetchErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [message, setMessage] = useState("");
  const {users} = useAuth();

  const currentRole = users?.roles || [];

  console.log("Current roles: ", currentRole);
  const isAdmin = currentRole.includes("ROLE_ADMIN");


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courseCode: "",
      title: "",
      duration: "",
      price: "",
      status: "DRAFT",
      description: "",
      lecturerId: "",
      categoryIds: [],
    },
  });

  useEffect(() => {
    const initData = async () => {
      try {
        if (isAdmin) {
        const [catResponse, lecResponse] = await Promise.all([
          categoryApi.getAll(),
          lecturerApi.getAll(),
        ]);
        console.log("Categories:", catResponse.content);
        console.log("Lecturers:", lecResponse.content);

        setCategories(catResponse);
        setLecturers(lecResponse);
      } else {
        const catResponse = await categoryApi.getAll();
        console.log("Categories:", catResponse.content);
        setCategories(catResponse); 
      }
     } catch (error) {
        setFetchErrors(error || "Cannot fetch data");
        console.error("Failed to fetch data:", error);
      }
    };
    initData();
  }, []);

  const handleOnSubmit = async (data) => {
    console.log("Submitting form with data:", payload);

    try {
      await courseManagementApi.createCourse(data);

      setMessage("Course created successfully!");

      alert("Course created successfully!");
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <Container fluid className="mt-3 p-1 min-vh-100">
      {/* Breadcrumb (Đường dẫn) */}
      <Breadcrumb>
        <Breadcrumb.Item href="#">Back to Course List</Breadcrumb.Item>
        <Breadcrumb.Item active>Create Course</Breadcrumb.Item>
      </Breadcrumb>
      <Row
        className="justify-content-center"
        style={{ fontSize: "0.9rem" }}
      >
        <h2 className="mb-4">Course Detail</h2>
        <hr />
        {message && <Form.Text className="text-success">{message}</Form.Text>}

        <Col md={12} lg={12}>
          <Form onSubmit={handleSubmit(handleOnSubmit)}>
            {/* Course Code */}
            <Form.Group className="mb-3">
              <Form.Label>Course Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course code"
                {...register("courseCode", {
                  required: "Course code is required",
                  maxLength: "Max length is 10",
                })}
              />

              {errors.courseCode && (
                <Form.Text className="text-danger">
                  {errors.courseCode.message}
                </Form.Text>
              )}
            </Form.Group>

            {/* Title */}
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course title"
                {...register("title", { required: "Title is required" })}
              />

              {errors.title && (
                <Form.Text className="text-danger">
                  {errors.title.message}
                </Form.Text>
              )}
            </Form.Group>

            <Row>
              {/* Duration */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Duration (hours)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Duration"
                    {...register("duration", {
                      required: "Duration is required",
                      min: { value: 1, message: "Minimun 1 hour" },
                    })}
                  />

                  {errors.courseCode && (
                    <Form.Text className="text-danger">
                      {errors.duration.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>

              {/* Price */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price (VND)</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      placeholder="Price"
                      {...register("price", {
                        required: "Price is required",
                        min: { value: 0, message: "Price must be >= 0" },
                      })}
                    />
                    <InputGroup.Text>₫</InputGroup.Text>
                  </InputGroup>
                  {errors.price && (
                    <Form.Text className="text-danger">
                      {errors.price.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>

            {/* Status */}
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" {...register("status")}>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </Form.Select>
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter course description"
                {...register("description")}
              />
            </Form.Group>

            {/* Lecturer */}
            {isAdmin ? 
            (<Form.Group className="mb-3">
              <Form.Label>Lecturer</Form.Label>
              <Form.Select
                name="lecturerId"
                {...register("lecturerId", {
                  required: "Pls select a lecturer",
                })}
              >
                <option value="">-- Select Lecturer --</option>
                {lecturers?.map((lec) => (
                  <option key={lec.id} value={lec.id}>
                    {lec.fullName}
                  </option>
                ))}
              </Form.Select>
              {errors.lecturerId && (
                <Form.Text className="text-danger">
                  {errors.lecturerId.message}
                </Form.Text>
              )}
            </Form.Group>

              
              ): null }

            
       
              
            {/* Categories */}
            <Form.Group className="mb-3">
              <Form.Label>Categories</Form.Label>
              <Form.Select className="fs-6"
                multiple
                {...register("categoryIds", {
                  required: "Pls select ay least one category",
                })}
              >
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Text className="text-muted">
                Hold Ctrl (Windows) or Cmd (Mac) to select multiple.
              </Form.Text>
              {errors.categoryIds && (
                <Form.Text className="text-danger d-block">
                  {errors.categoryIds.message}
                </Form.Text>
              )}
            </Form.Group>

            <div className="d-flex justify-content-end mt-4 mb-3">
              <Button variant="secondary" className="me-2">
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Course
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCourse;
