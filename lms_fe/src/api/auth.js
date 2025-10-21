import axiosClient, { axiosRefresh } from "./axiosClient";

const auth = {
  login: async (userRequest) => {
    try {
      return await axiosClient.post("/api/login", userRequest);
    } catch (error) {
      throw error;
    }
  },
  registerUser: async (user) => {
    try {
      const response = await axiosClient.post("/api/register", user);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    await axiosClient.post("/api/logout");
  },
  refreshToken: async() => {
    const response = await axiosRefresh.post("/api/refresh");
    return response.data;
  },
};

export default auth;

// Demo cũ sử dụng face api
// export const login = async (email, password) => {
//   try {
//     const response = await fetch(
//       `${API_URL}/users?email=${email}&password=${password}`
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP Error! Status: ${response.status}`);
//     }

//     const users = await response.json();

//     if (users.length === 0) {
//       throw new Error("Invalid email or password");
//     }

//     const user = users[0];

//     return user;
//   } catch (error) {
//     console.log(`Login failed: ${error}`);

//     throw error;
//   }
// };

// export const registerUser = async (user) => {
//   try {
//     const response = await fetch("http://localhost:3333/users", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(user)
//     });

//     if (!response.ok) throw new Error("Đăng ký thất bại");

//     return response.json();
//   } catch (error) {
//     console.error("Lỗi đăng ký:", error);
//     throw error;
//   }
// };
