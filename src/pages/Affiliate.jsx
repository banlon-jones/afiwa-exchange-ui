import React from "react";
import Container from "../components/container";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import { styled } from "../common/stitches";

const PrivacyPolicy = () => {
  return (
    <Main>
      <Container>
        <Header />
      </Container>
      <Container width="dynamic" add="headerMargin" style={{ flex: 1 }}>
        <h1 style={{ fontWeight: 600, marginBottom: 5, fontSize: 25 }}>
          AFFILIATE PROGRAM
        </h1>
        <p>
          Any registered user on AfiwaExchange has the opportunity to
          participate in our affiliate program. Thanks to this program, you have
          the opportunity to generate income of up to 5% of all transactions
          carried out through your affiliate link. You have complete flexibility
          to withdraw your winnings at any time as per your convenience. Profits
          will be processed and paid within 1-5 business days.
        </p>
        <br />
        <p>
          <h3 style={{ fontWeight: 600, marginBottom: 5, fontSize: 18 }}>
            How the Program works:
          </h3>
          When a new user accesses our platform through your affiliate link, our
          system automatically records your ID number. If this user successfully
          completes a transaction on our platform, you will receive 2% of the
          difference amount between the two currencies exchanged. For example,
          if a user decides to exchange 100 dollars with an exchange rate of 1 =
          0.95, the user will receive 95 dollars, and you will get 5% of the
          difference, or 5% of 5 .
        </p>
        <br />
        <p>
          <h3 style={{ fontWeight: 600, marginBottom: 5, fontSize: 18 }}>
            How to use the Affiliate Program:
          </h3>
          - Sign into your account.
          <br />- Go to the “Affiliation” tab.
          <br />- Copy the generated affiliate link and share it with your
          friends, on social networks, or any other relevant place. Expect to
          generate revenue from this sharing.
        </p>
        <br />
        <p>
          Please do not hesitate to contact us if you have any questions or need
          additional information. We are at your disposal to assist you.
        </p>
      </Container>
      <Container>
        <Footer />
      </Container>
    </Main>
  );
};

const Main = styled("main", {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  "@bp640": {
    display: "block",
  },
});

export default PrivacyPolicy;
