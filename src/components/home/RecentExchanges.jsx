import React, { useEffect, useState } from "react";
import { QueryClient } from "@tanstack/react-query";

import { styled } from "../../common/stitches";
import ExchangeCard from "../exchange/ExchangeCard";
import { publicApiClient } from "../../hooks/useCurrency";
import { uuid } from "../../common/utils";
import { Spinner } from "../spinner/Spinner";
import { useGetUserTransactions } from "../../hooks/useSession";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const RecentExchanges = () => {
  const [transactions, setTransactions] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const { data, isError } = useGetUserTransactions();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const currencies = await queryClient.fetchQuery({
          queryKey: ["currency"],
          queryFn: () => publicApiClient.get(),
        });

        const _object = data?.transactions.map((txn) => {
          const resFromCurrency = Object.entries(currencies).filter(
            (currency) => currency[1].id === txn.from
          )[0][1];
          const resToCurrency = Object.entries(currencies).filter(
            (currency) => currency[1].id === txn.to
          )[0][1];

          return {
            fromCurrency: {
              id: resFromCurrency.id,
              logo: resFromCurrency.logo.startsWith("http")
                ? resFromCurrency.logo
                : null,
              label: resFromCurrency.name,
              rate: parseFloat(resFromCurrency.rate),
              wallet: resFromCurrency.wallet,
            },
            toCurrency: {
              id: resToCurrency.id,
              logo: resToCurrency.logo.startsWith("http")
                ? resToCurrency.logo
                : null,
              label: resToCurrency.name,
              rate: parseFloat(resToCurrency.rate),
              wallet: resToCurrency.wallet,
            },
            amount: txn.amount,
          };
        });

        setTransactions(_object);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (data !== undefined) fetchDetails();
  }, [data]);

  if (
    (transactions !== undefined && Object.keys(transactions).length < 1) ||
    isError
  ) {
    return (
      <ExchangeWrapper id="recent-exchange">
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p>You Have No Recent Transaction(s)</p>
        </div>
      </ExchangeWrapper>
    );
  }

  return (
    <ExchangeWrapper id="recent-exchange">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          maxHeight: 338,
          overflow: "hidden",
          // overflowY: "scroll",
        }}
      >
        {isLoading ? (
          <div className="h-[1100%] min-h-[40vh] flex w-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          transactions &&
          transactions.map((value) => (
            <ExchangeCard
              fromCurrency={value.fromCurrency}
              toCurrency={value.toCurrency}
              amount={value.amount}
              key={uuid()}
            />
          ))
        )}
      </div>
    </ExchangeWrapper>
  );
};

const ExchangeWrapper = styled("div", {
  marginTop: "1rem",
});

export default RecentExchanges;
