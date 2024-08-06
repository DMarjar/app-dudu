import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://iza19c120k.execute-api.us-east-2.amazonaws.com/Prod',
    timeout: 5000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('id_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
