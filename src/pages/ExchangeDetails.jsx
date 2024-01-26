import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation, useBeforeUnload } from "react-router-dom";
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
import appStore from "../store/appStore";
import { useCreateTransaction } from "../hooks/useTransaction";
import ExchangeOverview from "../components/exchange/ExchangeOverview";

const ExchangeDetails = () => {
  const addNotification = toastStore((state) => state.add);
  const { mutate, data, isLoading, isError, error } = useCreateTransaction();
  const user = appStore((state) => state.user);
  const [isOverlay, setIsOverlay] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState({
    ...location.state,
    email: user.email,
  });
  useBeforeUnload(
    useCallback(() => {
      localStorage.stuff = JSON.stringify({
        ...data,
        ...state,
        isOverlay: isOverlay,
      });
    }, [data, state, isOverlay])
  );

  const handleCloseOverlay = () => {
    setIsOverlay(false);
    localStorage.removeItem("stuff");
    navigate(routes.home);
  };

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    localStorage.removeItem("stuff");
    event.preventDefault();

    const payload = {
      from: state.fromCurrency.id,
      to: state.toCurrency.id,
      amount: state.fromAmount,
      email: state.email,
      walletAddress: state.recipientWallet,
      walletName: state.recipientName,
    };

    mutate(payload);
  };

  useEffect(() => {
    if (isError) {
      if (error.response) {
        const { data } = error?.response;
        data?.message.forEach((msg) => {
          addNotification({
            title: data.error,
            message: msg,
            type: "error",
          });
        });
      } else {
        addNotification({
          title: "Error",
          message:
            "An error occured while processing request, please kind your transaction amount or contact admin",
          type: "error",
        });
      }
    }
  }, [isError, addNotification, error]);

  useEffect(() => {
    if (data !== undefined && !isError) {
      addNotification({
        title: "Successful",
        type: "success",
      });
      setIsOverlay(true);
    }
  }, [data, isError, addNotification]);

  useEffect(() => {
    if (localStorage.stuff != null) {
      const { isOverlay, ...rest } = JSON.parse(localStorage.stuff);
      setState(rest);
      setIsOverlay(isOverlay);
    }
  }, [isOverlay]);

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
          <Form onSubmit={handleSubmit}>
            <FlexContainer title="Your Email">
              <Input
                value={state.email}
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                onChange={handleChange}
              />
            </FlexContainer>
            <Card type="initial">
              <H1>Deposit {state.tnxInfo.fromCurrency}</H1>
              <FlexContainer>
                <p
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    marginTop: 5,
                    backgroundColor: "rgb(241, 242, 245)",
                    borderColor: "rgb(215, 215, 215)",
                    fontSize: 17,
                    padding: "10px 15px",
                    color: "rgb(33, 32, 32)",
                  }}
                >
                  {state.fromCurrency.wallet}
                </p>
              </FlexContainer>
            </Card>
            <Card type="initial">
              <H1>Recipient {state.tnxInfo.toCurrency}</H1>
              <FlexContainer title="Recipient Name">
                <Input
                  name="recipientName"
                  type="text"
                  placeholder="Enter Recipient Name"
                  onChange={handleChange}
                  value={state.recipientName}
                  required
                />
              </FlexContainer>
              <FlexContainer title={`Recipient ${state.tnxInfo.toCurrency}`}>
                <Input
                  value={state.recipientWallet}
                  name="recipientWallet"
                  type="text"
                  placeholder={`Recipient ${state.tnxInfo.toCurrency}`}
                  onChange={handleChange}
                  required
                />
              </FlexContainer>
            </Card>
            <FlexContainer
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ButtonSpinner type="submit">
                {!isLoading && <span>Submit</span>}
                {isLoading && <CgSpinner className="spinner" size={25} />}
              </ButtonSpinner>
              <Button onClick={() => navigate(routes.home)}>Cancel</Button>
            </FlexContainer>
          </Form>
        </Card>
      </Container>
      <Container>
        <Footer />
      </Container>
      {isOverlay && (
        <ExchangeOverview
          transactionId={data !== undefined ? data.id : state.id}
          handleCloseOverlay={handleCloseOverlay}
        />
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
        padding: "5px 0px",
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
  marginBottom: 5,
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

const Form = styled("form", {});

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

export default ExchangeDetails;
