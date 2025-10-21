import axios from "axios";
import axiosClient from "../axiosClient";

export const lecturerApi = {
    createCourse: async () => {},
    udateCourse: async () => {},
    deleteCourse: async () => {},
    getAll: async ()=> {
        const response = await axiosClient.get("/api/lecturers", {params: {paged: false}});
        return response.data;
    }

};