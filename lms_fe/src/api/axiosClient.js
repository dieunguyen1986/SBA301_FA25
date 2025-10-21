import axios from "axios";
import auth from "./auth";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  withCredentials: true, // send cookies (refreshToken)
});

export const axiosRefresh = axios.create({
    baseURL:  "http://localhost:8080",
    withCredentials: true,
});


axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor
axiosClient.interceptors.response.use(
(response)=> {

return response;
},
async (error) =>{
  const originalRequest = error.config;

  if(error.response?.status == 401 && !originalRequest._flag){
    originalRequest._flag = true;
    console.log("Try refreshing token.....");
    // Call refesh BE send refresh token
    const response = await auth.refreshToken();

    const newAccessToken = response.newAccessToken;
    console.log("New Access Token: ", newAccessToken);

    localStorage.setItem("accessToken", newAccessToken);

    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

    return axiosRefresh(originalRequest);
  }

  return Promise.reject(error);
}

);

// axiosClient.interceptors.response.use(
//   (response) => {
//    return response.data

//   },
//   (error) => {

//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosClient;
