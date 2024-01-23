import { useQuery } from "@tanstack/react-query";

import APIClient from "../services/api-client";

export const publicApiClient = new APIClient("/api/public/currency");

export const useGetCurrency = () =>
  useQuery({ queryKey: ["currency"], queryFn: () => publicApiClient.get() });

export const useGetCurrencyById = (id) =>
  useQuery({
    queryKey: ["currency", id],
    queryFn: () => publicApiClient.get(`/${id}`),
  });
