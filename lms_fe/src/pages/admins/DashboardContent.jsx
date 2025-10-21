// src/components/DashboardContent.jsx
import React from "react";
import { Row, Col, Card, ProgressBar, Button, Table } from "react-bootstrap";
import temp from "../../assets/images/logo.webp"
const DashboardContent = () => {
  return (
    <div className="p-3" style={{fontSize: '0.85rem'}}>
      <Row>
        {/* Left Section - Sale Analysis Trend -> LMS Stats */}
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Learning Analytics</Card.Title>
              <div className="mb-4 mt-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Total Courses</span>
                  <span>120</span>
                </div>
                <ProgressBar now={80} label={`80%`} variant="primary" />
              </div>
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <span>Total Students</span>
                  <span>2,340</span>
                </div>
                <ProgressBar now={65} label={`65%`} variant="success" />
              </div>
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <span>Assignments Submitted</span>
                  <span>430</span>
                </div>
                <ProgressBar now={45} label={`45%`} variant="warning" />
              </div>

              {/* Placeholder cho biểu đồ */}
              <div style={{ height: "150px", background: "linear-gradient(to top, #f28, #fff)" }} className="rounded mt-4">
                {/* Có thể dùng chart lib như Recharts/Chart.js */}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Section - Project Status -> Course Status */}
        <Col md={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Course Status</Card.Title>
              <Table hover responsive className="align-middle">
                <tbody>
                  <tr>
                    <td>
                      <img
                        src={temp}
                        width={20}
                        alt="course"
                        className="rounded-circle me-2"
                      />
                      Course: React Basics
                    </td>
                    <td>Enrolled: 320</td>
                    <td>Status: <span className="text-success">Active</span></td>
                    <td>Deadline: 07 Nov 2025</td>
                    <td>
                      <Button size="sm" variant="primary">Edit</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={temp}
                        width={20}
                        alt="course"
                        className="rounded-circle me-2"
                      />
                      Course: Java Spring Boot
                    </td>
                    <td>Enrolled: 210</td>
                    <td>Status: <span className="text-success">Active</span></td>
                    <td>Deadline: 15 Dec 2025</td>
                    <td>
                      <Button size="sm" variant="primary">Edit</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                       src={temp}
                        width={20}
                        alt="course"
                        className="rounded-circle me-2"
                      />
                      Course: Python for Data Science
                    </td>
                    <td>Enrolled: 180</td>
                    <td>Status: <span className="text-warning">Pending</span></td>
                    <td>Deadline: 10 Oct 2025</td>
                    <td>
                      <Button size="sm" variant="primary">Edit</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                       src={temp}
                        width={20}
                        alt="course"
                        className="rounded-circle me-2"
                      />
                      Course: Machine Learning
                    </td>
                    <td>Enrolled: 95</td>
                    <td>Status: <span className="text-danger">Archived</span></td>
                    <td>Deadline: 20 Sep 2025</td>
                    <td>
                      <Button size="sm" variant="primary">Edit</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;
