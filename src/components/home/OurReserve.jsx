import React from "react";
import { styled } from "../../common/stitches";
import Box from "../box";

const our_reserve = () => {
  const data = [
    { color: "#FF8A00", label: "Perfect Money", amount: "3.990000000048 USD" },
    { color: "#FF0099", label: "Perfect Money", amount: "3.990000000048 USD" },
    { color: "#00FFE0", label: "Perfect Money", amount: "3.990000000048 USD" },
    { color: "#8FFF00", label: "Perfect Money", amount: "3.990000000048 USD" },
    { color: "#BDFF00", label: "Perfect Money", amount: "3.990000000048 USD" },
    { color: "#660E0E", label: "Perfect Money", amount: "3.990000000048 USD" },
    { color: "#CC00FF", label: "Perfect Money", amount: "3.990000000048 USD" },
    { color: "#EA9E45", label: "Perfect Money", amount: "3.990000000048 USD" },
    { color: "#F1A347", label: "Perfect Money", amount: "3.990000000048 USD" },
  ];
  return (
    <OurReserve id="our-reserve">
      {data.map((reserve, index) => (
        <ReserveContainer key={index}>
          <Box style={{ backgroundColor: reserve.color }} />
          <P>{reserve.label}</P>
          <P>{reserve.amount}</P>
        </ReserveContainer>
      ))}
    </OurReserve>
  );
};

const OurReserve = styled("div", {
  display: "flex",
  gap: 30,
  flexWrap: "wrap",
  "@bp1024": {
    gap: 15,
  },
});

const ReserveContainer = styled("div", {
  display: "flex",
  gap: 3,
  flexDirection: "column",
  width: "calc(50vh * 0.35)",
  "@bp640": {
    width: "48%",
  },
  "@bp400": {
    width: "100%",
  },
});

const P = styled("p", {
  fontSize: 15,
  color: "rgb(95 94 94)",
});

export default our_reserve;
