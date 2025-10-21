import axios from "axios";
import axiosClient from "../axiosClient";

const courseManagementApi = {

  getAll: async () => {
    try {
      const response = await axiosClient.get("/api/v1/lecturer/courses?email=dieunt1@gmail.com");

      return response.data;
    } catch (error) {
      console.log(`Fetch data is fail: ${error.message}`);
      throw error;
    }
  },
  createCourse: async (course) => {
     const response = await axiosClient.post("/api/lecturer/courses", course);
      return response.data;
  },
  getCourseById: async(courseCode)=> {}

};

export default courseManagementApi;
