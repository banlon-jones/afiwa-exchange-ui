import React from "react";
import { styled } from "../../common/stitches";
import ExchangeFrom from "../exchange/ExchangeFrom";

const exchange = () => {
  return (
    <Exchange id="exchange">
      <Flex>
        <Section>
          <H1>Exchange</H1>
          <P>
            Efficient, adaptable, and safe international money transfers
            worldwide. Save both time and funds when you make international
            transfers through us.
          </P>
        </Section>
        <ExchangeFrom />
      </Flex>
    </Exchange>
  );
};

const Exchange = styled("div", {
  alignItems: "center",
  gap: 49.58,
  "& > div": {
    gap: 25,
    justifyContent: "space-between",
    "@bp1024": {
      flexWrap: "wrap",
      width: "100%",
    },
  },
});

const Flex = styled("div", { display: "flex" });

const Section = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxWidth: 450,
  flexBasis: 500,
  "@bp1024": {
    width: "100%",
    maxWidth: "100%",
  },
});

const H1 = styled("h1", {
  fontSize: 22,
  fontWeight: "bold",
  "@bp1024": {
    fontSize: 18,
  },
  "@bp640": {
    fontSize: 16,
  },
});

const P = styled("p", { color: "#757575" });

export default exchange;
