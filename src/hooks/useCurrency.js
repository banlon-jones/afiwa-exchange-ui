import { useQuery, useMutation } from "@tanstack/react-query";

import APIClient from "../services/api-client";

export const publicApiClient = new APIClient("/public/currency");
const privateApiClient = new APIClient("/protected/currency");

export const useGetCurrency = () =>
  useQuery({ queryKey: ["currency"], queryFn: () => publicApiClient.get() });

export const useGetCurrencyById = (id) =>
  useQuery({
    queryKey: ["currency", id],
    queryFn: () => publicApiClient.get(`/${id}`),
  });

export const useUpdateCurrency = () =>
  useMutation({
    mutationFn: ({ id, data }) => privateApiClient.put(`/${id}`, data),
    mutationKey: ["currency_update"],
  });

export const useCreateCurrency = () =>
  useMutation({
    mutationFn: ({ data }) => privateApiClient.post("/", data),
    mutationKey: ["new_currency"],
  });
