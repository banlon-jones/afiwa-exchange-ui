import React from "react";

import { styled } from "../../common/stitches";
import ExchangeCard from "../exchange/ExchangeCard";

const recent_exchanges = () => {
  const data = [
    {
      send: {
        label: "Perfect Money USD",
        amount: "15983.00 FCFA",
        color: "#D9D9D9",
      },
      recieve: {
        label: "Perfect Money USD",
        amount: "15983.00 FCFA",
        color: "blue",
      },
    },
    {
      send: {
        label: "Perfect Money USD",
        amount: "15983.00 FCFA",
        color: "#FF8A00",
      },
      recieve: {
        label: "Perfect Money USD",
        amount: "15983.00 FCFA",
        color: "#D9D9D9",
      },
    },
    {
      send: {
        label: "Perfect Money USD",
        amount: "15983.00 FCFA",
        color: "#FF8A00",
      },
      recieve: {
        label: "Perfect Money USD",
        amount: "15983.00 FCFA",
        color: "#FF8A00",
      },
    },
  ];

  return (
    <ExchangeWrapper id="recent-exchange">
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {data.map((value, index) => (
          <ExchangeCard data={value} key={index} />
        ))}
      </div>
    </ExchangeWrapper>
  );
};

const ExchangeWrapper = styled("div", {
  marginTop: "1rem",
});

export default recent_exchanges;
