import axios from "axios";
import appStore from "../store/appStore";

const token = appStore.getState().token;

const axiosInstance = axios.create({
  baseURL: "http://ec2-3-92-51-85.compute-1.amazonaws.com:8080",
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
});

// Add a request interceptor
if (token !== null) {
  axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization = token;
    return config;
  });
}

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

  get = async (endpoint = "", access_token = token) => {
    const res = await axiosInstance.get(`${this.baseEndPoint}${endpoint}`, {
      headers: {
        Authorization: `${access_token}`,
      },
    });
    return res.data;
  };
}

export default APIClient;
