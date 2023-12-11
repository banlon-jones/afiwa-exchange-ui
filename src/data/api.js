import axios from "axios";
import { useSelector } from "react-redux";
import { SelectAuth } from "../components/login/AuthSlice";
import { useEffect } from "react";

const apiUrl = 'http://localhost:3500/api'

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
    }, [auth])



    return {
        getCurrencies: () => axios.get(`${apiUrl}/public/currency`),
        signUpRequest: (credentials) => axios.post(`${apiUrl}/public/user/signup`, credentials),

        initiateTransactionRequest: (transaction) => axios.post(`${apiUrl}/protected/transactions`, transaction),
        getAllTransactions: () => axios.get(`${apiUrl}/protected/transactions/all`)
    }
}