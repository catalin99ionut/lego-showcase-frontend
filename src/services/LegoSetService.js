import axios from 'axios';

const API_URL = 'http://localhost:8080/lego-sets';

export const addLegoSetByNumber = async (setNumber) => {
    try {
        const response = await axios.post(API_URL, { setNumber });
        return response.data;
    } catch (error) {
        if (error.response?.data?.error) {
            throw new Error(error.response.data.error);
        }
        throw new Error("Failed to add Lego Set. Please try again.");
    }
};

export const getMyLegoSets = async () => {
    try {
        const response = await axios.get(`${API_URL}/my-sets`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch your Lego Sets.");
    }
};

// TODO: Implement the updateLegoSet and deleteLegoSet functions