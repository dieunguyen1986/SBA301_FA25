import { useEffect, useState, useContext } from "react";
import { Container, Table, Col, Row, Button } from "react-bootstrap";
import { BsCart, BsEye, BsPencilFill } from "react-icons/bs";
import CourseCard from "../common/CourseCard";
import CartModal from "../common/CartModal";
import UserContext from "../contexts/UserContext";

const courses = [
  {
    code: "J100",
    title: "Java Core",
    duration: 3,
    price: 1500000,
    lecturer: "Nam",
    description: "Java SE Programming Language",
  },
  {
    code: "R100",
    title: "React JS",
    duration: 3,
    price: 2000000,
    lecturer: "Hong",
    description: "React Frontend Framework",
  },
  {
    code: "S100",
    title: "Spring Boot",
    duration: 5,
    price: 2500000,
    lecturer: "Trung",
    description: "Spring Boot Framework",
  },
  {
    code: "T100",
    title: "Manual Testing",
    duration: 6,
    price: 3200000,
    lecturer: "Tuan",
    description: "Software Testing",
  },
  {
    code: "C100",
    title: "ChatGPT",
    duration: 3,
    price: 300000,
    lecturer: "Hue",
    description: "AI and NLP",
  },
];

function FormatCurrency(amount) {
  return Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

async function getCourseApi() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(courses);
    }, 1000);
  });
  return promise;
}

function getData() {
  const selectedItems = localStorage.getItem("mycart");
  return selectedItems ? JSON.parse(selectedItems) : [];
}

const CourseDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(getData());
  const { showModal, handleCloseModal } = useContext(UserContext);

  useEffect(() => {
    async function getCourses() {
      setLoading(true);
      const data = await getCourseApi();
      setCourses(data);
      setLoading(false);
    }
    getCourses();
  }, []);

  useEffect(() => {
    localStorage.setItem("mycart", JSON.stringify(cart));
  }, [cart]);

  function handleAddToCart(course) {
    const existingCourse = cart.find(item => item.code === course.code);

    if (existingCourse) {
      const updatedCart = cart.map(item =>
        item.code === course.code ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...course, quantity: 1 }]);
    }
    
  }

  function handleRemoveFromCart(courseCode) {
    const updatedCart = cart.filter(item => item.code !== courseCode);
    setCart(updatedCart);
  }

  if (loading) {
    return <p>Loading course list....</p>;
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Course Management</h2>
      </div>
      <hr />

      <Row>
        {courses.map((course) => (
          <Col md={3} className="mb-3" key={course.code}>
            <CourseCard course={course} onHandleToCart={handleAddToCart} />
          </Col>
        ))}
      </Row>

      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Title</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Lecturer</th>
            <th>Descriptions</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.code}>
              <td>{course.code}</td>
              <td>{course.title}</td>
              <td>{course.duration}</td>
              <td>{FormatCurrency(course.price)}</td>
              <td>{course.lecturer}</td>
              <td>{course.description}</td>
              <td>
                <BsPencilFill className="me-3 text-primary" style={{ cursor: 'pointer' }} />
                <BsEye className="me-3 text-info" style={{ cursor: 'pointer' }} />
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CartModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
      />
    </Container>
  );
};

export default CourseDashboard;