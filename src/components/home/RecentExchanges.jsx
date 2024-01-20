import React, { useEffect, useState } from "react";

import { styled } from "../../common/stitches";
import ExchangeCard from "../exchange/ExchangeCard";
import appStore from "../../store/appStore";
import { publicApiClient } from "../../hooks/useCurrency";
import { uuid } from "../../common/utils";

const RecentExchanges = () => {
  const user = appStore((state) => state.user);
  const [transactions, setTransactions] = useState([]);

  const data = user?.transactions ? user.transactions : [];

  useEffect(() => {
    const fetchDetails = () => {
      try {
        const _object = data.map(async (txn) => {
          const resFromCurrency = await publicApiClient.get(`/${txn.from}`);
          const resToCurrency = await publicApiClient.get(`/${txn.to}`);
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

        Promise.all(_object).then((res) => setTransactions(res));
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  if (Object.keys(transactions).length < 1) {
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
          overflowY: "scroll",
        }}
      >
        {transactions.map((value) => (
          <ExchangeCard
            fromCurrency={value.fromCurrency}
            toCurrency={value.toCurrency}
            amount={value.amount}
            key={uuid()}
          />
        ))}
      </div>
    </ExchangeWrapper>
  );
};

const ExchangeWrapper = styled("div", {
  marginTop: "1rem",
});

export default RecentExchanges;
