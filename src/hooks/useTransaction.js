import { useMutation, useQuery } from "@tanstack/react-query";

import APIClient from "../services/api-client";

export const privateApiClient = new APIClient("/protected/transactions");

export const useCreateTransaction = () =>
  useMutation({
    mutationKey: ["transaction"],
    mutationFn: (data) => privateApiClient.post("", data),
  });

export const useGetTransactionById = (id) =>
  useQuery({
    queryKey: ["transaction", id],
    queryFn: () => privateApiClient.get(`/${id}`),
    staleTime: 30000,
    refetchIntervalInBackground: true,
  });

export const useGetTransactions = () =>
  useQuery({
    queryKey: ["transactions"],
    queryFn: () => privateApiClient.get("/all"),
    staleTime: 60000,
  });

export const useUpdateTransaction = () =>
  useMutation({
    mutationKey: ["update_transaction"],
    mutationFn: ({ tnxId, payload }) =>
      privateApiClient.put(`/${tnxId}`, payload),
  });
