import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Container from "../components/container";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import { styled } from "../common/stitches";

const TermAndCondition = () => {
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
          Terms of use
        </h1>
        <p>
          These general conditions govern the use of the AfiwaExchange site.
          This site is owned and operated by AfiwaExchange. By using this site,
          you declare that you have read and understood the conditions of use
          and agree to respect them at all times.
        </p>
        <p>
          <strong>Intellectual property:</strong> All content published and made
          available on this site is the property of AfiwaExchange and its
          creators. This includes, but is not limited to, images, texts, logos,
          documents, downloadable files, as well as any element contributing to
          the composition of this site.
        </p>
        <p>
          <strong>Age Restrictions:</strong> The minimum age required to use
          this site is 21 years old. By using our site, users acknowledge that
          they are of the required age of 21 years or older. We accept no legal
          liability for misrepresentation of age.
        </p>
        <p>
          <strong>Acceptable Use:</strong> As a user, you agree to use our site
          in accordance with the law and not to use it for illicit purposes, in
          particular by committing to:
          <br />
          <ol>
            <li>- Do not violate the rights of other users of the site.</li>
            <li>
              - Not infringe the intellectual property rights of the site owners
              or any third parties.
            </li>
            <li>- Do not fraudulently access another user's account.</li>
            <li>- Do not participate in illegal activities on the site.</li>
          </ol>
          If we become aware of illegal use of this site or a violation of the
          terms of acceptable use set forth above, we reserve the right to
          limit, suspend or terminate your access to the site. We also reserve
          the right to take all legal measures necessary to prevent you from
          accessing our site.
        </p>
        <p>
          <strong>Applicable Laws:</strong> This policy complies with the laws
          set out in the Personal Information Protection and Electronic
          Documents Act (PIPEDA). This document is subject to the applicable
          laws of Cameroon in Africa, as well as its necessary rules and
          regulations.
        </p>
        <p>
          <strong>Accepted Payment Methods:</strong> On this site, we accept the
          following payment methods: Orange Money, MTN Money, Mobile money
          (Momo, Moov,..), Perfect Money USD, Payeer USD, Bitcoin, Ethereum,
          USDT, USDC, TUSD, and other cryptocurrencies. By providing us with
          your payment information, you authorize us to charge the amount due to
          the payment instrument you have chosen to use.
        </p>
        <br />
        <p>
          If you have any questions or require additional information, please do
          not hesitate to contact us. We are at your disposal to assist you.
        </p>
        <br />
        <h3 style={{ fontWeight: 600, marginBottom: 5, fontSize: 18 }}>
          1. General Provisions
        </h3>
        <p>
          This agreement (hereinafter referred to as the “Agreement”) sets forth
          the rules and conditions governing the provision of services by the
          AfiwaExchange platform. It constitutes the official public offer to
          individuals (hereinafter referred to as the "User") to enter into an
          agreement regarding the provision of services by AfiwaExchange, in
          accordance with the conditions set out below. Before using
          AfiwaExchange services, the User must read in full the terms of the
          “Service Provision Agreement with AfiwaExchange”. AfiwaExchange
          services may only be used if the User accepts the full terms of this
          Agreement. The current version of the Agreement is publicly available
          on the AfiwaExchange website (AfiwaExchange).
        </p>
        <br />
        <h3 style={{ fontWeight: 600, marginBottom: 5, fontSize: 18 }}>
          2. Terms and Definitions Used in the Contract
        </h3>
        <p>
          <br />- AfiwaExchange Service: This is the brand and commercial name
          of the system offering electronic currency exchange services via the
          Internet. <br />- Service Website: It refers to the AfiwaExchange
          website. <br />- User: This term designates any person wishing to use
          AfiwaExchange services and having accepted the terms of the agreement
          in accordance with its provisions. <br />- Payment System: This is a
          software product developed by a third party, which allows you to
          manage monetary and/or other debts, make payments for goods and
          services online, as well as facilitate settlements between its users.{" "}
          <br />- Electronic Money: Electronic money is a digital form of
          monetary and/or other liability, issued by the creator of this
          currency and used by the user. <br />
          - Payment/Transaction: This involves the transfer of electronic money
          and/or other monetary assets from the payer to the beneficiary. <br />
          - Payment System Customer: This designation designates a person who
          has entered into an agreement with the corresponding payment system,
          granting them property rights measured in conventional units accepted
          by the payment system in question.
          <br />- Application: An Application manifests itself as the User's
          intention to use one of the services offered by the AfiwaExchange
          Service. This is done by filling out an electronic form on the Service
          website, in accordance with the terms of the Agreement and the
          parameters specified in said Application. <br />- Source Currency:
          This is the electronic currency that the User wishes to sell or
          exchange. <br />- Source Account: The Source Account refers to the
          wallet number or other indication of the User's account in the payment
          system, from which the Source Currency is sent. <br />- Resulting
          Currency: This is the electronic money that the User receives
          following the sale or exchange of the Source Currency.
          <br />- Resulting Account: The Resulting Account is the wallet number
          or other designation of the User's account in the payment system to
          which the Resulting Currency will be sent.
          <br />- Currency Reserve: The Currency Reserve represents the amount
          of electronic money available on the AfiwaExchange platform at the
          time of creation of the Application. <br />- Currency Exchange:
          Currency Exchange consists of the conversion of electronic money from
          one payment system into electronic money from another payment system.{" "}
          <br />- Rate: The Rate corresponds to the value ratio between two
          electronic currencies during their exchange. <br />- Computer Hacker:
          A Computer Hacker is an individual qualified in computer intrusion,
          specialized in researching and exploiting unauthorized access to
          computer networks or other computer devices, with a view to illegally
          obtaining information, to make profits and cause damage.
        </p>
        <br />
        <h3 style={{ fontWeight: 600, marginBottom: 5, fontSize: 18 }}>
          3. Purpose of the Contract
        </h3>
        <p>
          3.1. The purpose of this Agreement is to provide the electronic
          currency exchange service to the AfiwaExchange User.
        </p>
        <br />
        <h3 style={{ fontWeight: 600, marginBottom: 5, fontSize: 18 }}>
          4. Terms of Provision of Services by the Service
        </h3>
        <p>
          4.1. AfiwaExchange services are requested by the User by submitting an
          Application via the Service Website.
          <br />
          4.2. The User controls the transaction or obtains information about
          its progress through the appropriate user interface on the Service's
          website.
          <br />
          4.3. The AfiwaExchange Service irrevocably executes the Applications
          in accordance with the operating conditions of the respective payment
          systems.
          <br />
          4.5. The AfiwaExchange Service is not an integral part of the
          agreement between the payment system and the Payment System Client,
          and it is in no way responsible for the actions of the payment system
          and its Client. The rights and responsibilities of the Payment System
          and its Client are governed by the terms of service provision of the
          respective payment systems.
          <br />
          4.6. The AfiwaExchange Service does not require certification that the
          sender and recipient of funds involved in the Transaction are the same
          person; the AfiwaExchange Service does not participate in the
          relationship between the sender and recipient of funds or electronic
          money.
          <br />
          4.7. The AfiwaExchange Service does not verify the eligibility and
          legitimacy of the User's possession of electronic currencies and/or
          funds involved in a specific Transaction.
          <br />
          4.8. By using the services of the AfiwaExchange Service, the User
          confirms that he or she legally holds and manages the funds and
          electronic money involved in the Payment in question.
          <br />
          4.9. The User undertakes to independently calculate and pay all taxes
          in accordance with the tax legislation in force in his place of
          residence.
          <br />
          4.10. In order to provide quality services to Users, the AfiwaExchange
          Service undertakes to carry out all actions relating to this Contract
          as quickly as possible.
        </p>
        <br />
        <h3 style={{ fontWeight: 600, marginBottom: 5, fontSize: 18 }}>
          5. Pricing of Services
        </h3>
        <p>
          5.1. The services are priced in accordance with the directives of the
          Service's management, and the prices are made public on the Service's
          Website.
          <br />
          5.2. The Service reserves the right to autonomously and unilaterally
          change electronic currency exchange rates and commission fees at any
          time. Users of the Service are informed of these modifications in
          advance by publishing information on this subject on the Service
          Website.
          <br />
          5.3. The Application created by the User on the Service Website will
          indicate the Price, the amount of the commission charged by the
          corresponding payment system for the execution of the Transaction, the
          amount of fees for the AfiwaExchange Service, as well as the amount
          total funds or electronic money transferred.
          <br />
          5.4. The AfiwaExchange Service charges the service fee at the time of
          completion of the relevant Transaction. The service fee is deducted
          from the resulting currency amount.
        </p>
        <br />
        <h3 style={{ fontWeight: 600, marginBottom: 5, fontSize: 18 }}>
          6. Electronic Money Exchange
        </h3>
        <p>
          6.1. By submitting the Application, the User gives instructions, and
          the AfiwaExchange Service, acting on its own behalf and at the expense
          of the User, undertakes to carry out the exchange of electronic money
          of a payment system (currency source) against the electronic money of
          another payment system (resulting currency) chosen by the User.
          <br />
          6.2. The User undertakes to transfer the source currency in the amount
          specified in the Application, and the AfiwaExchange Service, upon
          receipt of the relevant electronic currency, undertakes to transfer
          the resulting currency to the User, calculated at the rate in force
          and in accordance with the service rates.
          <br />
          6.3. The price of the AfiwaExchange Service is specified in the
          Application, and the User confirms it by clicking on the “Next” button
          present on one of the pages of the user interface when entering the
          Application.
          <br />
          6.4. The obligation of the AfiwaExchange Service to transfer
          electronic money to the User is considered fulfilled when the
          electronic money is debited from the account of the AfiwaExchange
          Service in the corresponding payment system, which is recorded in the
          transaction history of the payment system. payment concerned.
          <br />
          6.5. The AfiwaExchange Service reserves the right to cancel the
          Application created by the User if the funds corresponding to the
          source currency have not been credited to the Service account within
          20 minutes.
          <br />
          6.6. The AfiwaExchange Service has the right to suspend the
          transaction and withhold the User's funds in order to prevent any
          fraudulent or other activity that may result in financial losses or
          damage to the reputation of the Service or the User.
          <br />
          6.7. The AfiwaExchange Service may establish financial and
          quantitative limits for Transactions, and this information is
          available on the Service Website.
        </p>
        <br />
        <br />
        <h3 style={{ fontWeight: 600, marginBottom: 5, fontSize: 18 }}>
          7. Application of the Agreement
        </h3>
        <p>
          7.1. This Agreement is considered concluded under the terms of the
          public offer accepted by the User at the time of submission of the
          Application.
          <br />
          7.2. The public offer is recognized as information relating to the
          parameters and conditions of the Application, displayed by the
          AfiwaExchange Service.
          <br />
          7.3. Acceptance of the public offer constitutes acceptance by the User
          of the actions aimed at completing the Application, thereby confirming
          their intention to use the AfiwaExchange services in accordance with
          the conditions set out in this Agreement and specified in the
          Application.
          <br />
          7.4. The date and time of acceptance, as well as the parameters of the
          Application conditions, are automatically recorded by the
          AfiwaExchange Service at the time of finalization of the Application.
          <br />
          7.5. The Agreement comes into force once the Application is completed.
          The User has the right to refuse to execute the transaction on the
          Application before paying for the Transaction.
          <br />
        </p>
        <br />
        <h3 style={{ fontWeight: 600, marginBottom: 5, fontSize: 18 }}>
          8. Responsibilities of the Parties
        </h3>
        <p>
          8.1. The AfiwaExchange Service is liable to the User within the limit
          of the amount of funds or Electronic Money entrusted by the User.
          <br />
          8.2. The AfiwaExchange Service is not responsible for malfunctions,
          errors or breakdowns in the operation of the software and/or hardware
          supporting the operation of the AfiwaExchange Service, occurring for
          reasons beyond the control of the AfiwaExchange Service, nor for
          losses arising therefrom. results for the User.
          <br />
          8.3. The AfiwaExchange Service only provides exchange, purchase and
          sale services for electronic currencies. AfiwaExchange does not accept
          payments in favor of third parties under any circumstances and also
          prohibits exchange to wallets/accounts not belonging to the User.
          AfiwaExchange does not enter into any partnership relationship, enter
          into any contract with beneficiaries for their goods or services, and
          completely opposes such relationships. AfiwaExchange cannot be used as
          an intermediary service for mutual settlements between the buyer and
          the seller (the client and the performer, etc.).
          <br />
          8.4. The AfiwaExchange Service is not responsible for losses incurred
          by the User due to illegal actions of third parties.
          <br />
          8.5. The User assumes full responsibility for the reliability of the
          information specified when entering the Application Form. If the User
          did not specify certain data or specified them incorrectly, the
          AfiwaExchange Service is not responsible for any losses incurred by
          the User due to these errors.
          <br />
          8.6. Transaction information is recorded in the Service database and
          constitutes the main source of guidance for the Parties in the event
          of a dispute.
          <br />
          8.7. The Parties are exempt from any liability for total or partial
          non-fulfillment of their obligations under the Contract, if this
          results from circumstances of force majeure that arose after the entry
          into force of the Contract, as a result of unforeseeable extraordinary
          events and prevented by reasonable measures.
          <br />
          8.8. In all other cases of non-fulfillment or improper performance of
          their obligations under the Agreement, the Parties are liable in
          accordance with the legislation of the Russian Federation, subject to
          the terms of the Agreement.
        </p>
        <br />
        <h3 style={{ fontWeight: 600, marginBottom: 5, fontSize: 18 }}>
          9. Miscellaneous Provisions
        </h3>
        <p>
          9.1. The AfiwaExchange Service has the right to unilaterally change
          the Agreement by posting the changes on the system website. Amendments
          come into force upon publication, unless another period of entry into
          force of the amendments is established upon publication.
          <br />
          9.2. The AfiwaExchange Service has the right to refuse the
          registration of the User's Application without having to explain the
          reasons for this refusal.
          <br />
          9.3. In case of suspicious actions during registration of the
          Application by the User, the AfiwaExchange Service has the right to
          suspend the execution of these transactions until the reasons for
          these actions are clarified, in order to prevent damage caused by
          hacker attacks.
          <br />
          9.4. The AfiwaExchange Service has the right to refuse the execution
          of the transaction of exchange, purchase and sale of electronic
          currencies, if the source currency was transferred to the Service
          account without registration of the Application through user
          interfaces of the Service Website. Electronic money credited to the
          accounts of the Service without registration of the Application via
          theuser interfaces of the Website of the Service may be refunded to
          the User upon request, after deduction of payment system fees, if any.
          <br />
          9.5. The AfiwaExchange Service has the right to send information about
          the status of the exchange process to the email (or messenger) address
          provided by the User, as this is an integral part of the successful
          exchange process.
          <br />
          9.6. All disputes and disagreements arising from this Agreement, or
          which may arise from it, will be resolved through negotiations based
          on a written request from the User. Upon receipt of a complaint from
          the User, the AfiwaExchange Service must respond to the complaint or
          send a reasoned refusal to the User within 15 (fifteen) days. All
          necessary documents must be attached to the response. If the dispute
          is not resolved through the complaints procedure within 60 (sixty)
          days, each Party may seek to resolve the dispute in the court of the
          User's location. The User acknowledges having read all the provisions
          of this Contract and accepts them without reservation.
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

export default TermAndCondition;
