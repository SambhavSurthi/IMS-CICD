import axios from "axios";
import config from "../config";   

const API_URL = config.url;

export const getAllProducts = () => axios.get(API_URL);
export const getProductById = (id) => axios.get(`${API_URL}/${id}`);
export const addProduct = (product) => axios.post(API_URL, product);
export const updateProduct = (id, product) => axios.put(`${API_URL}/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);


// import axios from "axios";

// const API_URL = "http://localhost:2030/imsbackend/products";

// export const getAllProducts = () => axios.get(API_URL);
// export const getProductById = (id) => axios.get(`${API_URL}/${id}`);
// export const addProduct = (product) => axios.post(API_URL, product);
// export const updateProduct = (id, product) => axios.put(`${API_URL}/${id}`, product);
// export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);
