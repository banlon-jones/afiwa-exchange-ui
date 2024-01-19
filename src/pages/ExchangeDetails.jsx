import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdContentCopy } from "react-icons/md";
import { ImWhatsapp } from "react-icons/im";
import { FaTelegramPlane } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { CgSpinner } from "react-icons/cg";

import { styled } from "../common/stitches";
import { blackA, violet, blueA } from "@radix-ui/colors";
import Container from "../components/container";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import ExchangeCard from "../components/exchange/ExchangeCard";
import colors from "../common/colors";
import routes from "../common/routes";
import toastStore from "../store/toastStore";
import ExchangeProgressBar from "../components/exchange/ExchangeProgressBar";
import appStore from "../store/appStore";
import { useCreateTransaction } from "../hooks/useTransaction";

const ExchangeDetails = () => {
  const addNotification = toastStore((state) => state.add);
  const { mutate, data, isLoading, isError, error } = useCreateTransaction();
  const user = appStore((state) => state.user);
  const [isOverlay, setIsOverlay] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [transactionDetails, setTransactionDetails] = useState();

  const socialMediaContants = {
    email: "afiwa@gmail.com",
    whatsapp_number: "+7 5666343234",
    telegram_number: "+7 5666343234",
  };

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    addNotification({
      title: "INFO",
      message: "Copied",
    });
  };

  const handleCloseOverlay = () => {
    setIsOverlay(false);
  };

  const handleSubmit = () => {
    const payload = {
      from: state.fromCurrency.id,
      to: state.toCurrency.id,
      amount: state.fromAmount,
      email: user.email,
      walletAddress: state.recipientWallet,
      walletName: state.recipientName,
    };

    mutate(payload);
  };

  useEffect(() => {
    if (isError) {
      const { data } = error.response;
      data?.message.forEach((msg) => {
        addNotification({
          title: data.error,
          message: msg,
          type: "error",
        });
      });
    }
  }, [isError, addNotification, error]);

  useEffect(() => {
    if (data !== undefined) {
      addNotification({
        title: "Successful",
        type: "success",
      });

      setTransactionDetails(data);
      setIsOverlay(true);
    }
  }, [data, addNotification]);

  // console.log(state);

  if (state === null || user === null) return;

  return (
    <Main>
      <Container>
        <Header />
      </Container>
      <Container width="dynamic" add="headerMargin">
        <Card>
          <H1>Confirm Transaction</H1>
          <ExchangeCard
            fromCurrency={state.fromCurrency}
            toCurrency={state.toCurrency}
            amount={state.fromAmount}
          />
          <FlexContainer title="Exchange rate">
            <p style={{ fontSize: 15 }}>
              1 {state.fromCurrency.label} = {state.exchangeRate}{" "}
              {state.toCurrency.label}
            </p>
          </FlexContainer>
          <FlexContainer title="Status">
            <span
              style={{
                backgroundColor: "yellow",
                padding: "4px 9px",
                borderRadius: "25%",
                fontSize: 15,
              }}
            >
              Pending
            </span>
          </FlexContainer>
          <FlexContainer title="Your Email">
            <Input disabled value={user.email} />
          </FlexContainer>
          <Card type="initial">
            <H1>Recipient</H1>
            <FlexContainer title="Name">
              <Input disabled value={state.recipientName} />
            </FlexContainer>
            <FlexContainer title="Recipient Wallet">
              <Input disabled value={state.recipientWallet} />
            </FlexContainer>
          </Card>
          <FlexContainer
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* <Button onClick={handleSubmit}>Submit</Button> */}
            <ButtonSpinner onClick={handleSubmit}>
              {!isLoading && <span>Submit</span>}
              {isLoading && <CgSpinner className="spinner" size={25} />}
            </ButtonSpinner>
            <Button onClick={() => navigate(routes.home)}>Cancel</Button>
          </FlexContainer>
        </Card>
      </Container>
      <Container>
        <Footer />
      </Container>
      {isOverlay && transactionDetails && (
        <OverLayer>
          <CardContainer>
            <Card type="maxWidth">
              <H1
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: 16,
                  width: "90%",
                  margin: "0 auto 1.5rem",
                }}
              >
                Transaction ID: {transactionDetails.transactionId}{" "}
                <RxCross2
                  style={{ cursor: "pointer" }}
                  onClick={handleCloseOverlay}
                />
              </H1>
              <ExchangeProgressBar status={transactionDetails.status} />
              <p
                style={{
                  textAlign: "center",
                  width: "90%",
                  margin: "0 auto",
                }}
              >
                You can contact us directly via our email or your preferred
                social media.
              </p>
              <Platform>
                <ViaEmail>
                  <Input
                    style={{
                      fontSize: 17,
                      backgroundColor: "#0052CC",
                      color: colors.white,
                      fontWeight: "bold",
                      textAlign: "center",
                      height: 50,
                      borderRadius: 15,
                      width: "100%",
                    }}
                    disabled
                    value={socialMediaContants.email}
                  />
                  <div
                    style={{
                      height: 50,
                      borderRadius: 15,
                      backgroundColor: "#F1F2F5",
                      border: "1px solid #E0E1E5",
                      fontSize: 15,
                      padding: "2px 10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 65,
                    }}
                  >
                    <MdContentCopy
                      size={20}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCopy(socialMediaContants.email)}
                    />
                  </div>
                </ViaEmail>
                <SocialMediaContainer>
                  <SocialMedia
                    color="#25D366"
                    number={socialMediaContants.whatsapp_number}
                    name="whatsapp"
                    handleCopy={handleCopy}
                  >
                    <ImWhatsapp size={55} color={colors.white} />
                  </SocialMedia>
                  <SocialMedia
                    color="#0088cc"
                    number={socialMediaContants.telegram_number}
                    name="telegram"
                    handleCopy={handleCopy}
                  >
                    <FaTelegramPlane size={55} color={colors.white} />
                  </SocialMedia>
                </SocialMediaContainer>
              </Platform>
            </Card>
          </CardContainer>
        </OverLayer>
      )}
    </Main>
  );
};

const Main = styled("div", {});

const Card = styled("div", {
  maxWidth: "65%",
  borderRadius: "15px",
  backgroundColor: "rgba(255, 255, 255)",
  boxShadow: "0px 10px 20px 0px rgba(179, 187, 198, 0.45)",
  padding: 22,
  margin: "0 auto",
  variants: {
    type: {
      initial: {
        maxWidth: "100%",
        margin: 0,
        borderRadius: 0,
        border: 0,
        boxShadow: "none",
        backgroundColor: "transparent",
        padding: "6px 0px",
      },
      maxWidth: {
        maxWidth: "100%",
      },
    },
  },
  "@bp1430": {
    maxWidth: "85%",
  },
  "@bp1024": {
    maxWidth: "90%",
  },
  "@bp768": {
    maxWidth: "98%",
    padding: 10,
  },
});

const H1 = styled("h1", {
  fontSize: 22,
  fontWeight: "bold",
  marginBottom: 15,
  "@bp1024": {
    fontSize: 18,
    marginTop: 10,
  },
  "@bp640": {
    fontSize: 16,
  },
  variants: {
    type: {
      soft: {
        fontSize: 16,
        fontWeight: 500,
        margin: 0,
        "@bp768": {
          fontSize: 14,
        },
      },
    },
  },
});

const Input = styled("input", {
  width: 300,
  minWidth: "50%",
  height: 40,
  borderRadius: 10,
  backgroundColor: "#F1F2F5",
  border: "1px solid #E0E1E5",
  fontSize: 15,
  padding: "2px 10px",
  display: "inline-block",
  textAlign: "end",
  "@bp1024": {
    fontSize: 14,
    height: 35,
    width: 250,
  },
  "@bp640": {
    width: "100%",
  },
});

const FlexContainer = ({ title, children, style }) => {
  return (
    <Card
      type="initial"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {title ? (
        <>
          <H1 type="soft">{title}</H1>
          <div style={style}>{children}</div>
        </>
      ) : (
        <>{children}</>
      )}
    </Card>
  );
};

const Button = styled("button", {
  display: "flex",
  padding: 10,
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  borderRadius: "10px",
  backgroundColor: violet.violet2,
  color: blackA.blackA10,
  width: "29%",
  "&:hover": {
    backgroundColor: violet.violet4,
  },
});

const ButtonSpinner = styled("button", {
  display: "flex",
  padding: 10,
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  borderRadius: "10px",
  backgroundColor: blueA.blueA8,
  color: colors.white,
  width: "70%",
  "&:hover": {
    backgroundColor: blueA.blueA10,
  },
});

const OverLayer = styled("div", {
  position: "fixed",
  height: "100%",
  width: "100%",
  top: 0,
  left: 0,
  backgroundColor: blackA.blackA7,
  zIndex: 2,
  overflow: "hidden",
});

const CardContainer = styled("div", {
  width: 500,
  margin: "0 auto",
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "@bp1024": {
    width: "100%",
    maxWidth: "80%",
  },
  "@bp768": {
    maxWidth: "90%",
  },
  "@bp640": {
    maxWidth: "98%",
  },
});

const Platform = styled("div", {
  marginTop: 20,
});

const ViaEmail = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
});

const SocialMediaContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  marginTop: 20,
});

const SocialMedia = ({ color, number, name, children, handleCopy }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: 30,
        width: "50%",
        padding: 15,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: colors.white,
      }}
    >
      {children}
      <p
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          gap: 15,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 10,
        }}
      >
        <input
          value={number}
          name={name}
          style={{ backgroundColor: "transparent", width: "100%" }}
          disabled
        />
        <MdContentCopy
          style={{ cursor: "pointer" }}
          size={25}
          onClick={() => handleCopy(number)}
        />
      </p>
    </div>
  );
};

export default ExchangeDetails;
