import axios from "axios";

const apiUrl = 'http://ec2-3-92-51-85.compute-1.amazonaws.com:8080/api'
export const signUpRequest = (credentials) => axios.post(`${apiUrl}/public/user/signup`, credentials)

export const getCurrencies = () => axios.get(`${apiUrl}/public/currency`)
