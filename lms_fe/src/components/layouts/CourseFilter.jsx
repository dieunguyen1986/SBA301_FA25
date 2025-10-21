// src/components/CourseFilter.jsx
import React from 'react';
import { Card, Form, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseFilter = () => {
  return (
    <div className="course-filter-container">
      <Card>
        <Card.Header>
          <Form.Control type="text" placeholder="Search courses..." className="my-2" />
        </Card.Header>
        <Card.Body className="p-0">
          <Accordion defaultActiveKey={['0', '1', '2', '3']} alwaysOpen>
            
            {/* Bộ lọc Category */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>Category</Accordion.Header>
              <Accordion.Body>
                <nav>
                  {/* Sử dụng Nav.Link hoặc chỉ Link từ React Router */}
                  <ul className="list-unstyled">
                    <li><Link to="all-courses">All Courses</Link></li>
                    <li><Link to="web-development">Web Development</Link></li>
                    <li><Link to="data-science">Data Science</Link></li>
                    <li><Link to="design">Design</Link></li>
                  </ul>
                </nav>
              </Accordion.Body>
            </Accordion.Item>

            {/* Bộ lọc Level */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>Level</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Check type="checkbox" label="All Levels" />
                  <Form.Check type="checkbox" label="Beginner" />
                  <Form.Check type="checkbox" label="Intermediate" />
                  <Form.Check type="checkbox" label="Advanced" />
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            
            {/* Bộ lọc Rating */}
            <Accordion.Item eventKey="2">
              <Accordion.Header>Rating</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Check type="checkbox" label="4.5 & up" />
                  <Form.Check type="checkbox" label="4.0 & up" />
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            {/* Bộ lọc Price */}
            <Accordion.Item eventKey="3">
              <Accordion.Header>Price</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Check type="checkbox" label="Paid" />
                  <Form.Check type="checkbox" label="Free" />
                </Form>
              </Accordion.Body>
            </Accordion.Item>

          </Accordion>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CourseFilter;