import { Outlet } from "react-router-dom";
import SideBar from "../../components/layouts/SideBar";

const CourseDashBoard = () => {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

export default CourseDashBoard;
