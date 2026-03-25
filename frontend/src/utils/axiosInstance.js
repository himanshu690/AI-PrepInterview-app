import axios from "axios";
import { BASE_URL } from "./apiPath";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        // Checking for both a direct 'token' key and a nested 'token' inside 'userInfo'
        let accessToken = localStorage.getItem("token");

        if (!accessToken) {
            const userInfo = localStorage.getItem("userInfo");
            if (userInfo) {
                const parsedUser = JSON.parse(userInfo);
                accessToken = parsedUser.token; 
            }
        }

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                // Clear storage to prevent infinite loops with invalid tokens
                localStorage.clear();
                window.location.href = "/";
            } else if (error.response.status === 500) {
                console.error("Server error. Please try again later.");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeout. Please try again.");
        }
        
        return Promise.reject(error);
    } 
);

export default axiosInstance;