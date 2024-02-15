import axios from "axios";
import appStore from "../store/appStore";

const axiosInstance = axios.create({
  baseURL: "http://www.afiwaexchange.com:8080",
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
  }
);

class APIClient {
  baseEndPoint;

  constructor(endpoint) {
    this.baseEndPoint = endpoint;
  }

  post = async (endpoint = "", data) => {
    const res = await axiosInstance.post(
      `${this.baseEndPoint}${endpoint}`,
      data
    );
    return res.data;
  };

  get = async (endpoint = "") => {
    const res = await axiosInstance.get(`${this.baseEndPoint}${endpoint}`);
    return res.data;
  };

  put = async (endpoint = "", data) => {
    const res = await axiosInstance.put(
      `${this.baseEndPoint}${endpoint}`,
      data
    );
    return res;
  };
}

export default APIClient;
