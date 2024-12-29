import axios from "axios";

export const getAxios = () => {
    // token from local storage
    const token = localStorage.getItem("token");
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8080/api",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return axiosInstance;
}
