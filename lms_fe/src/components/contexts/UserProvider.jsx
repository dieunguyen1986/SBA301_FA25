import { useState, useReducer, useEffect, useContext, use } from "react";
import UserContext from "./UserContext";
import { jwtDecode } from "jwt-decode";

// 1. Định nghĩa Initial State (trạng thái khởi tạo)
function getInitialCartState() {
  const selectedItems = localStorage.getItem("mycart");
  return selectedItems ? JSON.parse(selectedItems) : [];
}

// 2. Create Reducer Function
// reducer nhận state hiện tại và một action (hành động) để trả về state mới
const cartReducer = (state, action) => {
  switch (
    action.type // hàh động của người dùng
  ) {
    case "ADD_ITEM":
      const courseToAdd = action.payload; // course người dùng vừa chọn
      const existingCourse = state.find(
        (item) => item.code === courseToAdd.code
      );

      if (existingCourse) {
        return state.map((item) =>
          item.code === courseToAdd.code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...courseToAdd, quantity: 1 }];
      }

    case "REMOVE_ITEM":
      const courseCodeToRemove = action.payload;
      return state.filter((item) => item.code !== courseCodeToRemove);

    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);


  // 3. Sử dụng useReducer thay cho useState
  // dispatch là hàm dùng để "gửi" các action
  const [cart, dispatch] = useReducer(cartReducer, [], getInitialCartState);

  useEffect(() => {
    localStorage.setItem("mycart", JSON.stringify(cart));
  }, [cart]);

  // Xử lý lưu lại thông tin vào users state khi F5
  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (accessToken) {
  //     try {
  //       const decodedToken = jwtDecode(accessToken);

  //       if (decodedToken.exp * 1000 < Date.now()) {
  //         console.log("Token has expired");
  //         localStorage.removeItem("accessToken");
  //         localStorage.removeItem("refreshToken");
  //         return;
  //       }
  //       const userExtracted = {
  //         email: decodedToken.sub,
  //         roles: decodedToken.roles,
  //       };

  //       setUsers(userExtracted);

  //       console.log("User loaded from token:", userExtracted);
  //     } catch (error) {
  //       console.error("Invalid token:", error);
  //       localStorage.removeItem("accessToken");
  //       localStorage.removeItem("refreshToken");
  //     }
  //   }
  //   setLoading(false);
  // }, []);

  // Tự động load user khi F5 / reload trang
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
    
        if (decodedToken.exp * 1000 < Date.now()) {
          console.log("Token has expired");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          return;
        }
        const userExtracted = {
          email: decodedToken.sub,
          roles: decodedToken.roles,
        };

        setUsers(userExtracted);

        console.log("User loaded from token:", userExtracted);

      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
      finally {
        setLoading(false);
      }
    }
    setLoading(false);
  }, []);

  // Demo cũ khi chưa dùng token và chưa có BE
  // Lưu user vào localStorage khi thay đổi
  // useEffect(() => {
  //   if (users) {
  //     localStorage.setItem("user", JSON.stringify(users));
  //   } else {
  //     localStorage.removeItem("user");
  //   }
  // }, [users]);

  // 4. Cập nhật các hàm xử lý để dùng dispatch
  function handleAddToCart(course) {
    dispatch({ type: "ADD_ITEM", payload: course });
  }

  function handleRemoveFromCart(courseCode) {
    dispatch({ type: "REMOVE_ITEM", payload: courseCode });
  }

  const setUserContext = (user) => {
    setUsers(user);
  };

  // Update khi logout
  const logout = () => {
    localStorage.removeItem("accessToken");
    //localStorage.removeItem("refreshToken");
    setUsers(null);

    console.log("User logged out, tokens removed");
    // Thêm điều hướng sau khi logout nếu cần
    window.location.href = "/login"; // Điều hướng về trang login
  };

  

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  

  const contextValues = {
    users,
    showModal,
    cart,
    loading,
    setUserContext,
    logout,
    handleShowModal,
    handleCloseModal, // Thêm hàm này để có thể đóng modal
    handleAddToCart,
    handleRemoveFromCart,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};


export const useAuth = () => useContext (UserContext);