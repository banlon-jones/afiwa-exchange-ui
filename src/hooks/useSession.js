import { useMutation, useQuery } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";

import APIClient from "../services/api-client";
import { firebaseAuth } from "../libs/Firebase";

const publicApiClient = new APIClient("/public/user");
const privateApiClient = new APIClient("/protected/user");

async function firebaseLogin(data, setUser) {
  const baseRes = await signInWithEmailAndPassword(
    firebaseAuth,
    data.email,
    data.password
  );
  if (baseRes === undefined) return;

  setUser({
    token: baseRes.user.accessToken,
  });

  setTimeout(() => {}, 1000);
  const userRes = await privateApiClient.get();

  setUser({
    isLogin: true,
    user: {
      fullName: userRes.fullName,
      email: userRes.email,
      emailVerified: userRes.emailVerified,
      phoneNumber: userRes.phoneNumber,
      role: userRes.role,
      transactions: userRes.transactions,
    },
  });

  return userRes;
}

export const useCreateAccount = () =>
  useMutation({
    mutationKey: ["user_signup"],
    mutationFn: (data) => publicApiClient.post("/signup", data),
  });

export const useLogin = () =>
  useMutation({
    mutationFn: (data) => firebaseLogin(...data),
    mutationKey: ["user"],
  });

export const useGetUserTransactions = () =>
  useQuery({
    queryKey: ["user_transactions"],
    queryFn: () => privateApiClient.get(),
    staleTime: 60000,
  });

export const useUpdateUserProfile = () =>
  useMutation({
    mutationKey: ["user_update"],
    mutationFn: (data) => privateApiClient.put("/update", data),
  });

export const useUpdateUserPassword = () =>
  useMutation({
    mutationKey: ["user_password"],
    mutationFn: (data) => publicApiClient.put("/update-password", data),
  });
