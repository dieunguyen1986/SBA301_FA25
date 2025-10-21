import axiosClient from "../axiosClient";

export const sectionServiceApi = {

    getAllSections: async (page=0, size=10) => {
        // Simulate an API call to fetch all sections
        

        const response = await axiosClient.get('/api/sections', {params: {page, size}});

        return response.data;
       
    },
}