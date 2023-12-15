import axios from "axios";
import { useSelector } from "react-redux";
import { SelectAuth } from "../components/login/AuthSlice";
import { useEffect } from "react";

const apiUrl = 'http://ec2-3-92-51-85.compute-1.amazonaws.com:8080/api'

export const useAxios = () => {
    const auth = useSelector(SelectAuth);

    useEffect(() => {
        axios.interceptors.request.use(
            config => {
                if (auth.accessToken) {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                }

                return config;
            }
        );

        console.log(axios.interceptors.request);
    }, [auth])



    return {
        initiateTransactionRequest: (transaction) => axios.post(`${apiUrl}/protected/transactions`, transaction),
        getCurrencies: () => axios.get(`${apiUrl}/public/currency`),
        signUpRequest: (credentials) => axios.post(`${apiUrl}/public/user/signup`, credentials),
        getUserTransactions: () => axios.get(`${apiUrl}/protected/user`),
        getCurrent: (currentId) => axios.get(`${apiUrl}/public/currency/${currentId}`)
    }
}
