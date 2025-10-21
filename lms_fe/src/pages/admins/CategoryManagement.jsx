import { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PencilSquare, TrashFill } from "react-bootstrap-icons";
import { PaginationControl } from "../../components/common/PaginationControl";
import { categoryApi } from "../../api/admin/categoryApi";

export const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async (pageNum = 0) => {
    try {
      setLoading(true);
      const data = await categoryApi.getAll(pageNum, size);
      setCategories(data.content);
      setTotalPages(data.totalPages);
      setPage(data.number);
    } catch (err) {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [size]);

  return (
    <section className="py-5 container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Category List</h1>
        <Button as={Link} to="/admin/categories/new" variant="primary">
          + Create New Category
        </Button>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <>
          <Table bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th style={{ width: "180px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={category.id}>
                    <td>{page * size + index + 1}</td>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>
                      <Button
                        as={Link}
                        to={`/admin/categories/${category.id}`}
                        size="sm"
                        variant="outline-primary"
                        className="me-2"
                      >
                        <PencilSquare />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => {
                          if (window.confirm("Are you sure?")) {
                            // TODO: delete API
                          }
                        }}
                      >
                        <TrashFill />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <PaginationControl
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => fetchCategories(p)}
          />
        </>
      )}
    </section>
  );
};
