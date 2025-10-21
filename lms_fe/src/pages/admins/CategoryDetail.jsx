import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { categoryApi } from "../../api/admin/categoryApi";


export const CategoryDetail = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onBlur",
  });

  const handleOnSubmit = async (data) => {
    console.log("Submit form data: ", data);
    try {
        await categoryApi.createCategory(data);

    //   if(response.status !== 200) {
    //     throw new Error("Failed to create category");
    //   }

      console.log("Create category successfully: ", data);
      setError(null);

      setMessage("Create category successfully");

      setTimeout(() => {
        navigate("/admin/categories");
      }, 3000);
    } catch (error) {
      console.log("Failed to create category: ", error);
      setError(error);
    }
  };

  return (
    <Container>
      <h1>Category Detail</h1>
      <hr />
      {error && <div className="text-danger">Error: {error.message}</div>}
      {message && <div className="text-success">Success: {message}</div>}

      <Form onSubmit={handleSubmit(handleOnSubmit)}>
        <Form.Group className="mb-3" controlId="categoryName">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="IT & Programming"
            {...register("name", {
              required: "Category name is required",
            })}
          />

          {errors.categoryName && (
            <Form.Text className="text-danger">
              {errors.categoryName.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} {...register("description")} />
        </Form.Group>

        <Button variant="info" type="submit"> Submit</Button>
      </Form>
    </Container>
  );
};
