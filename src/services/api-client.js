import axios from "axios";
import appStore from "../store/appStore";

const axiosInstance = axios.create({
  baseURL: "https://afiwaexchange.com:8443/api",
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${appStore.getState().token}`;
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
    if (parseInt(error?.response.status) === 403) {
      appStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

class APIClient {
  baseEndPoint;

  constructor(endpoint) {
    this.baseEndPoint = endpoint;
  }

  post = (endpoint = "", data) =>
    axiosInstance
      .post(`${this.baseEndPoint}${endpoint}`, data)
      .then((res) => res.data);

  get = (endpoint = "") =>
    axiosInstance
      .get(`${this.baseEndPoint}${endpoint}`)
      .then((res) => res.data);

  put = async (endpoint = "", data) =>
    axiosInstance
      .put(`${this.baseEndPoint}${endpoint}`, data)
      .then((res) => res.data);
}

export default APIClient;
