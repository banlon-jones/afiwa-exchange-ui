import React, { useState } from "react";
import ReactHtmlParser from "html-react-parser";
import { styled } from "../common/stitches";
import Container from "../components/container";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import style from "../style/faq.module.css";

const Faq = () => {
  const [faqs, setFaqs] = useState([
    {
      question:
        "Coins transferred in two transactions. How much will the exchange be?",
      answer:
        "In case the coins were transferred in two transactions, the exchange will automatically be adjusted to the amount of the transaction that receives confirmation first. The exchange will be completed for this amount, contrary to what you indicated in the request. Please note that the second transaction will not be considered by the exchanger. To obtain a refund of the excess, please contact AfiwaExchange Support. Refunds will be made in accordance with our AfiwaExchange policy.",
      open: false,
    },
    {
      question: `By mistake, I transferred more coins to the exchanger than I indicated in the request. What should I do?`,
      answer: `If you transferred more coins than you indicated in the request, the exchange will be
      processed automatically for the amount specified in the request. We cannot automatically adjust and
      increase the request amount to pay out more funds than indicated, due to various restrictions and
      limitations. To return the difference, please contact the AfiwaExchange support service. Refunds will
      be made in accordance with our AfiwaExchange policy.`,
      open: false,
    },
    {
      question: `I transferred fewer coins than I indicated when filling out the application on the website. Will my exchange be completed?`,
      answer: `If the payment amount is lower than the minimum threshold specified on the site, the request
        will not be processed automatically. To resolve the issue, you need to contact AfiwaExchange
        Support. The operator will offer you options to resolve the problem. In other cases, when the customer
        has paid less than indicated in the request, the amount will be adjusted, and the exchange will be
        completed automatically without operator intervention. There is no need to contact support.`,
      open: false,
    },
    {
      question: `The time to pay for the app is running out, and my crypto exchange is delaying the transfer of coins. What should I do?`,
      answer: `No need to worry! The address assigned for payment of the request remains active in our
        system permanently. If the parts arrive at the exchanger's address after the order is canceled due to a
        waiting time, the exchange will not be completed automatically. You need to wait until the exchange
        finishes transferring the funds, and the transaction in the blockchain receives the number of
        confirmations required by the exchanger. After that, you can contact AfiwaExchange support.
        Operators will verify receipt of coins at your address and process the exchange manually.`,
      open: false,
    },
    {
      question: `I can't pay you in Litecoin because my crypto exchange doesn't support this address format.`,
      answer: `Since SegWit support was added to Litecoin in April 2017, addresses starting with M have
        been mapped to addresses starting with 3. We generate addresses in P2WSH format starting with M,
        which are SegWit compatible addresses. We do not use the old P2SH address format. Currently, the
        issue is not expected to affect the Litecoin network as a whole, as all participants were required to
        update their software. If a crypto exchange or wallet does not use the old address format, it should
        cause outrage among users, as there has been plenty of time to change. However, if you have
        problems transferring funds to P2WSH addresses starting with M, you can use converters, like
        AfiwaExchange. It is important to note that this is third-party software, and the exchanger is not
        responsible for its operation.`,
      open: false,
    },
    {
      question: `I paid to the Ripple exchanger, but my request was canceled. What should I do?`,
      answer: `This can happen for several reasons. Here are three common reasons and steps to follow:
      <ol>
        <br/><li>The amount you paid to the exchanger differs from the amount you indicated when filling out the
          application. The exchanger expects a 100% match between the amount specified in the request and
          the transfer amount. If these amounts differ, the payment is not automatically recognized by the
          system. Contact exchanger support to resolve this issue. Operators will adjust the request amount
          and complete the exchange manually.
        </li>
        <br/><li>The customer did not indicate a "Tag" when paying. A payment label is important to automatically
          identify the customer's payment. If the "Tag" is not specified or if it is modified, the system will not find
          the payment. Contact exchanger support to resolve this issue. Operators will find your payment and
          complete the exchange manually.
        </li>
          <br/><li>Payment was made after the request was canceled due to a timeout. This usually happens when
          you make a transfer to the exchanger's address from the account of a cryptocurrency exchange which
          may have delays. After the transaction is saved in the block browser, contact the exchanger's support.
          Operators will find your payment and complete the exchange manually.
        </li>
      </ol>`,
      open: false,
    },
    {
      question: `Through which network should I transfer Tether ERC20 (USDT), Ethereum, XRP, BTC,
TRC, LTC, etc. coins?`,
      answer: `When choosing the direction of exchange, pay attention to the value of the cryptocurrency
network displayed on the showcase. If the "Binance" network is not displayed in the cryptocurrency
change selection window, then you need to transfer the tokens to the standard network of the
selected currency.<br/>If you transfer other tokens that are not on the standard network, we will not see them, because the
payment address only accepts tokens on a certain network. So you need to make sure that you are
using the correct network to transfer funds.`,
      open: false,
    },
    {
      question: `Is registration required on your site?`,
      answer: `No, registration is not compulsory. However, if you register, you will be able to track your
trading history in your personal account.`,
      open: false,
    },
    {
      question: `Do you have any discounts or special offers?`,
      answer: `Any special conditions must be negotiated privately. Generally, they are offered for large
exchange amounts. To agree to these conditions, create a ticket in our AfiwaExchange support
system specifying the direction of the exchange and the amount.`,
      open: false,
    },
    {
      question: `I chose a currency to trade, but now I want to get another one. Can you make a
replacement?`,
      answer: `Such a change is not provided for in our work regulations. If you are unable to receive funds
from the exchanger, to the wallet specified in the app and in your chosen currency, you will be asked
to make a refund in accordance with our AfiwaExchange policy.`,
      open: false,
    },
    {
      question: `The exchange of applications has begun. What is the problem?`,
      answer: `Among the main reasons why this situation can occur, the most common are:
      <ul>
      <br/><li>- Error in recipient details;</li>
      <br/><li>- Exceeding the fund balance limit;</li>
      <br/><li>- Technical failure of the service;</li>
      <br/><li>- Problems with payment systems.</li>
      </ul>In any case, it is important to understand that the funds received by the exchanger cannot simply
disappear. If you encounter such a situation, please contact the AfiwaExchange support service. The
operators will help you resolve the problem.`,
      open: false,
    },
    {
      question: `The exchange has been suspended. For what?`,
      answer: `The AfiwaExchange Service has the right to suspend operation and withhold User funds in
order to avoid fraudulent actions and other activities that could lead to financial and reputationallosses for the Service or the User. If you encounter such a situation, please contact the
AfiwaExchange support service. Operators will check, identify the cause and suggest ways to resolve
the problem. Please note that certain activities such as creating a large number of trade requests to
catch a preferred rate without completing the majority of paid trades may result in your trades being
suspended, in accordance with our Terms of Service.`,
      open: false,
    },
    {
      question: `Why has the exchange rate shown on my application changed?`,
      answer: `AfiwaExchange is an automatic exchange service that processes exchanges with manual
intervention. AfiwaExchange's pricing policy is based on an automatic algorithm capable of changing
exchange rates at any time based on market conditions. The conversion rate is usually set when the
user fills out the redemption form. However, the rate may change before the user makes the payment.
The rate at which the exchange is made is the one displayed when the user clicks on "Proceed to
payment". The service explains that the rate can change for various reasons and emphasizes the
importance of monitoring the rate throughout the exchange process.`,
      open: false,
    },
    {
      question: `After I made my payment, the exchange rate changed.`,
      answer: `AfiwaExchange is a fully automatic exchange service that waits 20 minutes for funds to arrive
at its address or account. If the funds do not arrive within this time, the exchange is canceled, and the
funds from the exchange are removed from the reserve. To resolve this issue, the user should contact
AfiwaExchange support. Two options are generally offered: refunds in accordance with the
AfiwaExchange refund policy or resumption and finalization of the exchange with a possible change in
the rate. The current rate of a currency on AfiwaExchange may differ from the market rates on other
cryptocurrency exchange platforms, because AfiwaExchange is based on its own pricing policy. If the
user is not satisfied with the new exchange rate, they can refuse to continue with the exchange and
opt for refund.`,
      open: false,
    },
    {
      question: `You write that the exchange was successful, but I did not receive funds on my bank card?`,
      answer: `AfiwaExchange works with international payment systems such as Visa, MasterCard, MIR,
Mobile Money to transfer money to bank cards. Typically, funds are credited instantly to customer
cards. However, the Ministry of Railways has regulations that guarantee the crediting of funds to
customers' cards within 5 working days. Although delays are rare, customers may receive transfers
with a slight delay, usually due to temporary issues within the payment chain, involving issuing banks,
acquiring banks and integrators. If a customer has not received funds on their card within 5 business
days, they can contact AfiwaExchange support to initiate the payment tracing process.
AfiwaExchange has not experienced any cases of lost payments, and if a payment is missing, the
service refunds the funds to the customer.`,
      open: false,
    },
    {
      question: `Is it possible to withdraw to cards of non-Russian/African banks?`,
      answer: `AfiwaExchange carries out card exchanges of banks of the Russian Federation and Africa. It
is not specified whether cards from non-Russian or non-African banks are supported. It would be
recommended to contact AfiwaExchange support for specific information on available withdrawal
options.`,
      open: false,
    },
    {
      question: `Is it possible to return the coins sent to the scammer's address?`,
      answer: `If the request status is completed, it is technically impossible to cancel the exchange.
However, if the exchange has not yet been completed, that is, the exchanger has not yet sent the
exchange funds to the wallet specified in the request, the funds can be returned. For this, the user
must contact AfiwaExchange support.`,
      open: false,
    },

    {
      question: `Be careful! Fraudulent sites operate under our name.`,
      answer: `AfiwaExchange warns users about fraudulent sites that copy their interface and are
registered on similar domains. These scammers usually offer non-lucrative offers to lure victims.
Exchanges on these fraudulent sites are not carried out, and no one responds to victims' requests.
AfiwaExchange advises users to bookmark their official site in their browser and not use dubious
sites. They also encourage users to report phishing sites in order to neutralize them.`,
      open: false,
    },

    {
      question: `Be careful! Scammers offer work on behalf of the exchanger.`,
      answer: `AfiwaExchange warns of fraud related to purported job offers on behalf of their exchange
service, including for positions for customer service operators and other specialists. These fraudulent
job offers typically ask victims to pay for their training. AfiwaExchange emphasizes that these job
advertisements are not issued by them and that any request for funds from AfiwaExchange on third-
party resources is a fraudulent action.`,
      open: false,
    },

    {
      question: `Why don't we accept "dirty parts"?`,
      answer: `AfiwaExchange does not accept "dirty coins" for reasons of compliance with the
recommendations of the intergovernmental organization FATF (International Financial Action Task
Force) aimed at protecting the international financial system against money laundering, financing of
terrorism and the financing of the proliferation of weapons of mass destruction. These
recommendations are recognized as the international standard for combating money laundering and
the financing of terrorism (AML/CFT). AfiwaExchange verifies assets transferred by customers to
ensure that they are not associated with illegal activities and thus protect its users. They do not accept
coins that have been fraudulently obtained, used for illegal activities, or are associated with crimes
such as drug trafficking or terrorist financing. By accepting these coins, users could get into trouble,
and their reputation could suffer. AfiwaExchange takes the security of its users very seriously and is
committed to combating illegal activities.`,
      open: false,
    },

    {
      question: `Is it possible to withdraw to cards of non-Russian/African banks?`,
      answer: `AfiwaExchange carries out card exchanges of banks of the Russian Federation and Africa. It
is not specified whether cards from non-Russian or non-African banks are supported. It would be
recommended to contact AfiwaExchange support for specific information on available withdrawal
options.`,
      open: false,
    },

    {
      question: `Is it possible to return the coins sent to the scammer's address?`,
      answer: `If the request status is completed, it is technically impossible to cancel the exchange.
However, if the exchange has not yet been completed, that is, the exchanger has not yet sent the
exchange funds to the wallet specified in the request, the funds can be returned. For this, the user
must contact AfiwaExchange support.`,
      open: false,
    },

    {
      question: `Be careful! Fraudulent sites operate under our name.`,
      answer: `AfiwaExchange warns users about fraudulent sites that copy their interface and are
registered on similar domains. These scammers usually offer non-lucrative offers to lure victims.
Exchanges on these fraudulent sites are not carried out, and no one responds to victims' requests.
AfiwaExchange advises users to bookmark their official site in their browser and not use dubious
sites. They also encourage users to report phishing sites in order to neutralize them.`,
      open: false,
    },

    {
      question: `Be careful! Scammers offer work on behalf of the exchanger.`,
      answer: `AfiwaExchange warns of fraud related to purported job offers on behalf of their exchange
service, including for positions for customer service operators and other specialists. These fraudulent
job offers typically ask victims to pay for their training. AfiwaExchange emphasizes that these jobadvertisements are not issued by them and that any request for funds from AfiwaExchange on third-
party resources is a fraudulent action.`,
      open: false,
    },

    {
      question: `Why don't we accept "dirty parts"?`,
      answer: `AfiwaExchange does not accept "dirty coins" for reasons of compliance with the
recommendations of the intergovernmental organization FATF (International Financial Action Task
Force) aimed at protecting the international financial system against money laundering, financing of
terrorism and the financing of the proliferation of weapons of mass destruction. These
recommendations are recognized as the international standard for combating money laundering and
the financing of terrorism (AML/CFT). AfiwaExchange verifies assets transferred by customers to
ensure that they are not associated with illegal activities and thus protect its users. They do not accept
coins that have been fraudulently obtained, used for illegal activities, or that are associated with
crimes such as drug trafficking or terrorist financing. By accepting these coins, users could get into
trouble, and their reputation could suffer. AfiwaExchange takes the security of its users very seriously
and is committed to combating illegal activities.`,
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };

  return (
    <Main>
      <Container>
        <Header />
      </Container>
      <Container width="dynamic" add="headerMargin" style={{ flex: 1 }}>
        <List className={style.faqs}>
          {faqs.map((faq, index) => (
            <ListItem
              key={index}
              className={[style.faq, faq.open ? style.open : ""].join(" ")}
              onClick={() => toggleFAQ(index)}
            >
              <Heading className={style.faq_question}>{faq.question}</Heading>
              <Text className={style.faq_answer}>
                {ReactHtmlParser(faq.answer)}
              </Text>
            </ListItem>
          ))}
        </List>
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

const List = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

const ListItem = styled("li", {});

const Heading = styled("h3", {
  padding: 10,
  cursor: "pointer",
  borderBottom: "1px solid #b5b5b578",
  borderLeft: "5px solid transparent",
  fontSize: 16,
  "&:hover": {
    borderLeftColor: "green",
    color: "green",
  },
});

const Text = styled("p", {
  color: "#2f2f2fc2",
  padding: "0 10px 10px",
  fontSize: 15,
});

export default Faq;
