import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";

import APIClient from "../services/api-client";
import { firebaseAuth } from "../libs/Firebase";

const publicApiClient = new APIClient("/api/public/user");
const privateApiClient = new APIClient("/api/protected/user");

async function firebaseLogin(data, setUser) {
  const baseRes = await signInWithEmailAndPassword(
    firebaseAuth,
    data.email,
    data.password
  );
  if (baseRes === undefined) return;

  const userRes = await privateApiClient.get("", baseRes.user.accessToken);

  setUser({
    token: baseRes.user.accessToken,
    isLogin: true,
    user: {
      name: userRes.name,
      email: userRes.email,
      emailVerified: userRes.emailVerified,
      phoneNumber: userRes.phoneNumber,
      role: userRes.role,
    },
  });

  return userRes;
}

export const useCreateAccount = () =>
  useMutation({ mutationFn: (data) => publicApiClient.post("/signup", data) });

export const useLogin = () =>
  useMutation({
    mutationFn: (data) => firebaseLogin(...data),
    mutationKey: ["user"],
  });
