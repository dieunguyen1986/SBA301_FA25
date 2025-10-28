import axiosClient from "../axiosClient";


export const categoryApi = {
    getAllPaged: async(page=0, size = 10) => { 
        const response = await axiosClient.get("/api/categories", { params: {paged: true, page, size} });
        return response.data;
    },
    getAll: async() => {
        const response = await axiosClient.get("/api/categories", {params: {paged: false}});
        return response.data;
    },
    createCategory: async(data) => { await axiosClient.post("/api/categories", data); },
    deleteCategory: async(id) => {
        await axiosClient.delete(`/api/categories/${id}`);
    },
    

};