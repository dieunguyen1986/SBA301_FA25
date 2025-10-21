import { Button, Spinner } from "react-bootstrap";
import { sectionServiceApi } from "../../api/admin/sectionServiceApi";
import { useEffect, useState } from "react";
import { PaginationControl } from "../../components/common/PaginationControl";
import { Link } from "react-router-dom";

export const SectionManagement = () => {
  const [sections, setSections] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sections from API or database
  const fetchSections = async (pageNum = 0) => {
    try {
      setLoading(true);

      // fetching data
      const data = await sectionServiceApi.getAllSections(pageNum, size);
      console.log("Section List: ", data.content);
      setTotalPages(data.totalPages);
      setPage(data.number);
      
      setSections(data.content);
    } catch (error) {
      setError("Failed to fetch sections");
      console.error("Error fetching sections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, [size]);

  return (
    <section>
      {/* <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Category List</h1>
                <Button as={Link} to="/admin/categories/new" variant="primary">
                  + Create New Category
                </Button>
              </div> */}
      <div className="d-flex justify-content-between align-items-center mb-4 mt-5">
        <h2>Section Management</h2>
        <hr />
        <Button variant="primary">Add New Section</Button>
      </div>
      <hr />
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : sections.length > 0 ? (
        <>
          <table className="table table-hover table-sm small">
            <thead className="table-light">
              <tr>
                <th>Section ID</th>
                <th>Section Name</th>
                <th>Order Index</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section, index) => (
                <tr key={index}>
                  <td>{section.id}</td>
                  <td>{section.title}</td>
                  <td>{section.orderIndex}</td>
                  <td>{section.courseTitle}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2">
                      Edit
                    </Button>
                    <Button variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            <PaginationControl
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => {
                fetchSections(p);
              }}
            />
          </div>
        </>
      ) : (
        <p>No sections available. Please add a new section.</p>
      )}
    </section>
  );
};
