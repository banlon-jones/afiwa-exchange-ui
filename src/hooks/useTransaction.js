import { useMutation, useQuery } from "@tanstack/react-query";

import APIClient from "../services/api-client";

const publicApiClient = new APIClient("/api/public/transactions");
const privateApiClient = new APIClient("/api/protected/transactions");

export const useCreateTransaction = () =>
  useMutation({
    mutationKey: ["transaction"],
    mutationFn: (data) => privateApiClient.post("", data),
  });

export const useGetTransactionById = (id) =>
  useQuery({
    queryKey: ["transaction", id],
    queryFn: () => privateApiClient.get(`/${id}`),
    staleTime: 120000,
  });
