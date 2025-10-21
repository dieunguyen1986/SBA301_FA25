import { useEffect, useState, useContext } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import UserContext from "../../components/contexts/UserContext";
import CartModal from "../../components/common/CartModal";
import CourseCard from "../../components/common/CourseCard";
import {findCourse} from "../../api/learner/courseApi";
import { useSearchParams } from "react-router-dom";


function FormatCurrency(amount) {
  return Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

// async function getCourseApi2() {
//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(courses);
//     }, 1000);
//   });
//   return promise;
// }

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState(null);
  // const [cate]
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const {
    cart,
    showModal,
    handleCloseModal,
    handleAddToCart,
    handleRemoveFromCart,
  } = useContext(UserContext);

  useEffect(() => {
    async function getCourses() { 

      console.log("Get course function", keyword);
      setLoading(true);

      // call api service
      try {
        const receivedCourses = await findCourse(keyword);

        setCourses(receivedCourses);

      } catch(error) {
        setMessage(error.message || "Có lỗi bất thường khi tải dữ liệu...!!");
      } finally {
        setLoading(false);
      }
    };

    // Demo cũ khi dung face api
    //   const promise = fetch("http://localhost:3333/courses2");
      
    //   promise
    //     .then((response) => {

    //       if (!response.ok) {
    //         console.log(response.statusText);
    //         throw new Error(`Fetch failed: ${response.statusText}`);
    //       }

    //       console.log(`Status: ${response}`);
    //       return response.json();

    //     })
    //     .then((data)=>{
    //       setCourses(data);
    //     })
    //     .catch((error) => {
    //       setMessage(error.message | "Có lỗi bất thường khi tải dữ liệu...!!");
    //     })
    //     .finally(() => {
    //       setLoading(false);
    //     });
    // };

    getCourses();
    
  }, [keyword]);

  if (loading) {
    return <p>Loading course list....</p>;
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
        
        {message && (<p className="text-danger">{message}</p>)}

        <p className="text-muted">{courses.length} courses</p>
        <Row>
          <Form.Label className="text-nowrap" column="sm" lg={3}>
            Order by:
          </Form.Label>
          <Col>
            <Form.Select size="sm" aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      <Row>
        {courses.map((course) => (
          <Col md={3} className="mb-3" key={course.id}>
            <CourseCard course={course} onHandleToCart={handleAddToCart} />
          </Col>
        ))}
      </Row>

      <CartModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
      />
    </Container>
  );
};

export default CourseList;
