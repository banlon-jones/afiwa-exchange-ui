import React from "react";
import { styled } from "../../common/stitches";
import Box from "../box";
import { calculateExchangeAmount } from "../../common/utils";

const ExchangeCard = ({ fromCurrency, toCurrency, amount }) => {
  if (
    fromCurrency === undefined ||
    toCurrency === undefined ||
    amount === undefined
  )
    return;

  return (
    <CardContainer>
      <Card>
        <CardWrapper>
          <OptionLabel>
            {fromCurrency.logo ? (
              <OptionLabelLogo src={fromCurrency.logo} alt="coin" />
            ) : (
              <Box style={{ width: 30, backgroundColor: "dodgerblue" }} />
            )}
            <span>{fromCurrency.label}</span>
          </OptionLabel>
        </CardWrapper>
        <p>{parseFloat(amount).toPrecision(4)}</p>
      </Card>
      <div>
        <Svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17 8L21 12M21 12L17 16M21 12L3 12"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </div>
      <Card>
        <CardWrapper>
          <OptionLabel>
            {toCurrency.logo ? (
              <OptionLabelLogo src={toCurrency.logo} alt="coin" />
            ) : (
              <Box style={{ width: 30, backgroundColor: "dodgerblue" }} />
            )}
            <span>{toCurrency.label}</span>
          </OptionLabel>
        </CardWrapper>
        <p>
          {calculateExchangeAmount(
            fromCurrency.rate,
            toCurrency.rate,
            amount
          )[1].toPrecision(6)}
        </p>
      </Card>
    </CardContainer>
  );
};

const CardContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 40,
  "@bp1024": {
    gap: 20,
    fontSize: 15,
  },
  "@bp768": {
    gap: 10,
    fontSize: 14,
  },
  "@bp400": {
    fontSize: 12,
  },
});

const Svg = styled("svg", {
  width: 24,
  height: 24,
  "@bp400": {
    width: 13,
  },
});

const Card = styled("div", {
  display: "flex",
  padding: "8px 10px",
  justifyContent: "space-between",
  alignItems: "center",
  flex: "1 0 0",
  borderRadius: 8,
  border: "1px solid #E0E1E5",
});

const CardWrapper = styled("div", {
  display: "flex",
  gap: 20,
  alignItems: "center",
});

const OptionLabel = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 3,
});

const OptionLabelLogo = styled("img", {
  height: 30,
  width: 30,
  objectFit: "contain",
});

export default ExchangeCard;
