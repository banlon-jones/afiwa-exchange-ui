import axios from "axios";
import { useSelector } from "react-redux";
import { SelectAuth } from "../store/slices/AuthSlice";
import { useEffect } from "react";

const apiUrl = 'http://ec2-3-92-51-85.compute-1.amazonaws.com:8080/api'
// const apiUrl = 'http://localhost:3500/api'

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
        getCurrentUser: () => axios.get(`${apiUrl}/protected/user`),
        getCurrency: (currentId) => axios.get(`${apiUrl}/public/currency/${currentId}`),
        initiateTransactionRequest: (transaction) => axios.post(`${apiUrl}/protected/transactions`, transaction),
        getAllTransactions: () => axios.get(`${apiUrl}/protected/transactions/all`),
        editRate: (rate, id) => axios.put(`${apiUrl}/protected/currency/${id}`, rate),
        addRate: (rate) => axios.put(`${apiUrl}/protected/currency`, rate),
        updateTransactionStatus: (newStatus, id) => axios.put(`${apiUrl}/protected/transactions/${id}`, newStatus)
    }
}
