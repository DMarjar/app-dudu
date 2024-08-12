import axios from "axios";

// MISSIONS API
const axiosMissionApiInstance = axios.create({
  baseURL: "https://alkaryi7ic.execute-api.us-east-2.amazonaws.com/Prod",
  timeout: 10000,
});

axiosMissionApiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("id_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const axiosUsersApiInstance = axios.create({
  baseURL: "https://3tpdypq2mc.execute-api.us-east-2.amazonaws.com/Prod",
  timeout: 10000,
});

// USERS API
axiosUsersApiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("id_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosMissionApiInstance, axiosUsersApiInstance };
