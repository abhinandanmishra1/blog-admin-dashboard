import { User } from "../types";
import { getAxios } from "../axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const login = async (user: User) => {
    const axios = getAxios();
    const { data } = await axios.post(`${BASE_URL}/login`, user);
    
    return data;
}

export const registerUser = async (user: User) => {
    const axios = getAxios();
    const { data } = await axios.post(`${BASE_URL}/register`, user);
    
    return data;
}

export const getUser = async () => {
    const axios = getAxios();
    const { data } = await axios.get(`${BASE_URL}/me`);
    return data;
}
