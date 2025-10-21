import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getCoursesApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/courses`);

    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.statusText}`);
    }

    const data = await response.json();

    return data;

  } catch (error) {
    throw error;
  }
};

export const findCourse = async (keyword) =>{
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/public/courses?searchKeyword=${keyword}`);// {withCredentials: true}
    return response.data;

  } catch (error) {
    console.error(`Lỗi khi tìm kiếm khoá học ${error.message}`);
    return [];
  }
};