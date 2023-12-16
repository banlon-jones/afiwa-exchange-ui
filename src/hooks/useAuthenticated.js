import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SelectAuth } from "../store/slices/AuthSlice";

export function useAuthenticated () {
    const auth = useSelector(SelectAuth);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(auth.accessToken && +auth.expiresAt > new Date().getTime());
    }, [auth, isAuthenticated]);

    return isAuthenticated;
}