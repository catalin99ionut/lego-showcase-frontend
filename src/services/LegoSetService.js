import axios from 'axios';

const API_URL = 'http://localhost:8080/legosets';

export const getAllLegoSets = () => axios.get(API_URL);

export const getLegoSetsByUser = (userId) => axios.get(`${API_URL}/${userId}`);

export const addLegoSet = (legoSetData) => axios.post(API_URL, legoSetData);

// TODO: Implement the updateLegoSet and deleteLegoSet functions