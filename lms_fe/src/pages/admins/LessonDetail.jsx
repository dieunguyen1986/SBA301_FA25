import React, { useState } from "react";
import axios from "axios";
import { Col, Form, Row } from "react-bootstrap";
import { lessonsServiceApi } from "../../api/admin/lessonServiceApi";

export default function LessonDetail() {
  const [message, setMessage] = useState("");
  const [lesson, setLesson] = useState({
    title: "",
    description: "",
    orderIndex: 0,
    duration: 0,
    lessonType: "VIDEO",
    isPreview: false,
    sectionId: null,
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) =>
    setLesson({ ...lesson, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append(
        "lesson",
        new Blob([JSON.stringify(lesson)], { type: "application/json" })
      );

      if (file) {
        formData.append("file", file);
      } else {
        console.warn("No file selected, only metadata will be uploaded");
      }
      if (file) formData.append("file", file);

    

        await lessonsServiceApi.createNewLesson(formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

      alert("Lesson created!");
    } catch (error) {
      console.error("Error creating lesson:", error);
      setMessage("Failed to create lesson. Please try again.");
    }
  };

  return (
    <section>
      <h4 className="mt-4">Create New Lesson</h4>
      <hr />
      {message && <p className="text-danger">{message}</p>}
      <Form style={{ fontSize: 15 }} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Lesson Title</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder="Introduction Python"
                name="title"
                onChange={(e)=> {setLesson({...lesson, "title": e.target.value})}}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lessonType">
              <Form.Label>Lesson Type</Form.Label>
              <Form.Select aria-label="Default select example" size="sm">
                <option value="VIDEO">Video</option>
                <option value="DOCUMENT">Document</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="section">
              <Form.Label>Section</Form.Label>
              <Form.Select aria-label="Default select example" size="sm">
                <option>Select Section</option>
                <option value="1">Section 1</option>
                <option value="2">Section 2</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="orderIndex">
              <Form.Label>Order Index</Form.Label>
              <Form.Control type="number" size="sm" placeholder="1" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="duration">
              <Form.Label>Duration (in seconds)</Form.Label>
              <Form.Control type="number" size="sm" placeholder="300" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="isPreview">
              <Form.Check type="checkbox" size="sm" label="Is Preview" />
            </Form.Group>

            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Control
                type="file"
                size="sm"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
          </Col>

          <Col md={12} className="mb-3">
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Col>

          <Col className="d-flex justify-content-end">
            <button className="btn btn-info me-2" type="submit">
              Save Lesson
            </button>

            <button className="btn btn-secondary" type="submit">
              Cancel
            </button>
          </Col>
        </Row>
      </Form>
    </section>
  );
}
