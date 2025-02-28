import axios from "axios";

export const db = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    },
});

export const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "multipart/form-data",
    },
});
