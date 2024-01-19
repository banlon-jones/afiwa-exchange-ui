import { useMutation, useQuery } from "@tanstack/react-query";

import APIClient from "../services/api-client";

export const privateApiClient = new APIClient("/api/protected/transactions");

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

export const useGetTransactions = () =>
  useQuery({
    queryKey: ["transactions"],
    queryFn: () => privateApiClient.get("/all"),
    staleTime: 120000,
  });

export const useUpdateTransaction = (id) => {
  useMutation({
    mutationKey: ["transaction", id],
    mutationFn: (data) => privateApiClient.put(`/${id}`, data),
  });
};
