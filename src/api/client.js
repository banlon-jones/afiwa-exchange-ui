// import { create } from "apisauce";
import axios from "axios";

// import authStorage from "../store/appStore";

const client = axios.create({
  baseURL: "http://www.afiwaexchange.com:8080",
});

// client.addAsyncRequestTransform(async (request) => {
//   const token = authStorage.getState().token;
//   if (!token) return;

//   request.headers.common["Content-Type"] = "application/json";
//   request.headers["Authorization"] = `Bearer ${token}`;
// });

// client.addAsyncResponseTransform(async (response) => {
//   const data = response.data;
//   if (data && data["statusCode"] === 401) authStorage.getState().logout();
// });

export default client;
