import axiosClient from "../axiosClient";

export const lessonsServiceApi = {
  getAllLessons: async (page, size) => {
    // Simulate an API call
    const response = await axiosClient.get("/lessons", {
      params: { page, size },
    });
    return response.data;
  },
  createNewLesson: async (lessonData) => {
    const response = await axiosClient.post("/api/lessons", lessonData);
    return response.data;
  }
};
