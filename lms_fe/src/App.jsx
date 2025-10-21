import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "./components/layouts/MainLayout";
import "./App.css";
import { UserProvider } from "./components/contexts/UserProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/layouts/HomePage";
import CourseDashBoard from "./pages/learning/CourseDashBoard";
import Register from "./components/Register";
import AddCourse from "./pages/admins/AddCourse";
import { AdministrationLayout } from "./pages/admins/AdmintrationLayout";
import DashboardContent from "./pages/admins/DashboardContent";
import { CategoryDetail } from "./pages/admins/CategoryDetail";
import { Login } from "./components/Login";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PrivateRoute } from "./routes/PrivateRoute";
import { SectionManagement } from "./pages/admins/SectionManagement";
import { LessonManagement } from "./pages/admins/LessonManagement";
import LessonDetail from "./pages/admins/LessonDetail";
import { CategoryManagement } from "./pages/admins/CategoryManagement";
import CourseList from "./pages/learning/CourseList";
import ViewCourseDetail from "./pages/learning/ViewCourseDetail";
import CourseManagement from "./pages/admins/CourseManagement";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addCourse" element={<AddCourse />} />

          {/* Learner */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />

            {/* Sửa từ "/courses" thành "courses" */}
            <Route path="courses" element={<CourseDashBoard />}>
              <Route index element={<CourseList />} />
              <Route path=":code" element={<ViewCourseDetail />} />
            </Route>

            {/* Đường dẫn tương đối đúng */}
            {/* <Route path="courses/:code" element={<CourseDetail />} />  */}

            {/* <Route path='lecturer' element={<LecturerDashboard />}  /> */}
          </Route>

          {/* Admin */}

          <Route
            path="/admin"
            element={
              //<PrivateRoute isAuthenticate = {true}>
              <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                <AdministrationLayout />
              </ProtectedRoute>
              //</PrivateRoute>
            }
          >
            <Route index element={<DashboardContent />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="categories/new" element={<CategoryDetail />} />
          </Route>

          <Route
            path="/lecturer"
            element={
              <ProtectedRoute allowedRoles={["ROLE_LECTURER"]}>
                <AdministrationLayout />
              </ProtectedRoute>

              // <PrivateRoute isAuthenticate = {true}>
              //   <AdministrationLayout />
              // </PrivateRoute>
            }
          >
            <Route index element={<CourseManagement />} />
            <Route path="courses/new" element={<AddCourse />} />
            <Route path="sections" element={<SectionManagement />} />
            <Route path="lessons" element={<LessonManagement />} />
            <Route path="lessons/new" element={<LessonDetail />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
