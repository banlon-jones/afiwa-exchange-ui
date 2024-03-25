import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Container from "../components/container";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import { styled } from "../common/stitches";

const PrivacyPolicy = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]);

  return (
    <Main>
      <Container>
        <Header />
      </Container>
      <Container width="dynamic" add="headerMargin" style={{ flex: 1 }}>
        <h1
          style={{
            fontWeight: 600,
            marginBottom: 5,
            fontSize: 25,
            color: "red",
          }}
        >
          Return policy
        </h1>
        <p>
          This policy describes the procedures for returning assets to users and
          the fees associated with processing these returns. Here is a summary
          of the main points of this policy:
          <br />
          1. Assets include all electronic currencies, fiat national currencies
          (non-monetary and monetary), cryptocurrencies and tokens.
          <br />
          2. The Exchange Service (Service) is an Internet-based software
          enabling the exchange of assets.
          <br />
          3. Exchange is the transfer of assets between the accounts of the
          Service and the User.
          <br />
          4. The User is any person who has used the Service to make an
          exchange.
          <br />
          5. Order is the User's request to make a trade, submitted
          electronically through the Service's website interfaces.
          <br />
          6. The Timeout is the time allowed for the User to transfer the assets
          to the Service accounts for exchange.
          <br />
          7. Unaccounted Funds are assets credited to the accounts of the
          Service without an order having been placed via the site interfaces or
          in excess of the amounts specified in the order.
          <br />
          8. Return means the Service's actions to transfer unaccounted assets
          or funds from the Service's accounts to users' accounts.
          <br />
          9. Refund means the actions of the Service to cancel a completed
          exchange for the purpose of return. Here are the key points of the
          asset return policy:
        </p>
        <br />
        <p>
          1. Cette politique décrit les actions et inactions du Service pour la
          restitution des Actifs aux Utilisateurs, ainsi que les frais facturés
          par le Service pour le traitement des Retours. Cette politique fait
          partie intégrante des Conditions d'utilisation;
          <ul>
            <li>
              - Returns can only be made for an amount not exceeding the amount
              of the asset sent by the User to the Exchange Service accounts.
            </li>
            <li>
              - Returns can only be made to the account of the User specified in
              the order or from which the Service accepted the assets, except in
              certain specific cases.
            </li>
            <li>
              - The service fee for making a return is deducted from the amount
              of the asset returned to the user.
            </li>
            <li>
              - The Service undertakes to return the assets only if the exchange
              has not been carried out, that is to say if the User has not
              received the assets from the Service on their accounts.
            </li>
            <li>
              - The Service does not reimburse the User for payment system fees
              in the event of a return.
            </li>
            <li>
              - The Service has the right to refuse the User in the refund
              procedure, except in certain specific cases.
            </li>
            <li>
              - The Service may charge a fee for the return of unaccounted funds
              in certain situations.
            </li>
            <li>
              - The Service does not benefit from holding the User's assets to
              be returned.
            </li>
            <li>
              - The Service can make concessions and make returns in the event
              of an error by the User, in particular when he has made the
              exchange to an inaccessible account.
            </li>
            <li>
              - The Service may also make concessions and make returns to an
              account of the User other than that specified in the order, if
              necessary.
            </li>
            <li>
              - Return costs are specified in the policy. In summary, this
              policy describes the procedures for returning assets to users,
              including associated fees. Returns are only made under certain
              conditions and according to the terms described in the policy.
            </li>
          </ul>
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
