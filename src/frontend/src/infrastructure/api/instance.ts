import axios, { AxiosInstance } from "axios";

let instance: AxiosInstance;

// This URL should be loaded from a .env file in a real production app
const baseURL: string = `http://localhost:5000`;

instance = axios.create({
    baseURL: baseURL
});

export { instance };