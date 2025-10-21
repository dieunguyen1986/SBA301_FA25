import React, { use } from "react";
import { Nav } from "react-bootstrap";
import {
  Speedometer2,
  BarChartLine,
  People,
  ClipboardCheck,
  CashStack,
  Book,
  Gear,
  BoxArrowRight,
  BookmarkDash,
} from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import "../../styles/AdminSidebar.css";
import { MENU_CONFIG } from "./MENU_CONFIG";
import { useAuth } from "../../components/contexts/UserProvider";

const AdminSidebar = () => {
  const { users } = useAuth();
  const location = useLocation();

  if (!users) {
    return null;
  } // Nếu chưa có thông tin user, không hiển thị sidebar

  // get role from users
  const isAdmin = users.roles.includes("ROLE_ADMIN");
  const isLecturer = users.roles.includes("ROLE_LECTURER");

  if (!isAdmin && !isLecturer) {
    return <div className="p-3">Access Denied</div>;
  }

  // Define sidebar items based on role


  const sidebarItems = (isAdmin)? MENU_CONFIG["ADMIN"] : MENU_CONFIG["LECTURER"];

  return (
    <div
      className="d-flex flex-column bg-white shadow-sm border-end"
      style={{ width: "250px", minHeight: "100vh", paddingTop: "20px" }}>
      <Nav
        className="flex-column" defaultActiveKey="#dashboard" style={{ fontSize: "0.9rem" }}>
        {sidebarItems.map((item, index) => {
          const isActive = location.pathname === item.link;
          console.log("Current path:", location.pathname, "Item path:", item.link, "isActive:", isActive);
          return (
            <Nav.Link
              key={index}
              as={Link}
              to={item.link}
              className={`d-flex align-items-center py-2 px-3 text-decoration-none 
              ${
                isActive
                  ? "bg-info text-white rounded-end me-2 mt-2 shadow-sm"
                  : "text-dark me-2 mt-2 hover-effect"
              }`}
              style={
                item.active
                  ? { borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }
                  : {}
              }
            >
              {item.icon}
              <span className="ms-3 fw-medium">{item.label}</span>
            </Nav.Link>
          );
        })}

        <div className="mt-auto px-1 py-1 border-top">
          <Nav.Link
            href="#logout"
            className="d-flex align-items-center text-dark mt-3 hover-effect"
          >
            <BoxArrowRight size={20} />
            <span className="ms-3 fw-medium">Đăng xuất</span>
          </Nav.Link>
        </div>
      </Nav>
    </div>
  );
};

export default AdminSidebar;
