import React from "react";
import { blackA } from "@radix-ui/colors";
import { RxCross2 } from "react-icons/rx";

import { styled } from "../../common/stitches";
import colors from "../../common/colors";
import ExchangeProgressBar from "./ExchangeProgressBar";
import { ImWhatsapp } from "react-icons/im";
import { FaTelegramPlane } from "react-icons/fa";
import { useGetTransactionById } from "../../hooks/useTransaction";
import { Link } from "react-router-dom";
import routes from "../../common/routes";
import { Accounts, telegram_url, whatsapp_url } from "../../constants/Accounts";

const ExchangeOverview = ({ transactionId, handleCloseOverlay }) => {
  const { data, isError } = useGetTransactionById(transactionId);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  if (data === undefined || isError) return;

  return (
    <OverLayer>
      <CardContainer>
        <Card>
          <H1>
            Transaction ID: {data.transactionId}{" "}
            <div
              style={{
                cursor: "pointer",
                backgroundColor: "#0041ffdb",
                padding: 3,
                borderRadius: 50,
              }}
            >
              <RxCross2
                style={{ color: "white", fontWeight: "bold" }}
                onClick={handleCloseOverlay}
              />
            </div>
          </H1>
          <ExchangeProgressBar status={data.status} />
          <p
            style={{
              textAlign: "center",
              width: "90%",
              margin: "0 auto",
            }}
          >
            You can contact us directly via our email or your preferred social
            media.
          </p>
          <Platform>
            <ViaEmail>
              <EmailButton
                onClick={() => (window.location = `mailto:${Accounts.email}`)}
              >
                Contact us via email
              </EmailButton>
            </ViaEmail>
            <SocialMediaContainer>
              <SocialMediaButton
                type={"whatsapp"}
                onClick={() => openInNewTab(whatsapp_url(data.transactionId))}
              >
                <ImWhatsapp size={55} color={colors.white} />
              </SocialMediaButton>
              <SocialMediaButton
                type={"telegram"}
                onClick={() => openInNewTab(telegram_url(transactionId))}
              >
                <FaTelegramPlane size={55} color={colors.white} />
              </SocialMediaButton>
            </SocialMediaContainer>
          </Platform>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 20,
              gap: 20,
            }}
          >
            <CustomLink to={routes.home}>Start a new transaction</CustomLink>
            <CustomLink to={routes.exchange}>view transactions</CustomLink>
          </div>
        </Card>
      </CardContainer>
    </OverLayer>
  );
};

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

const Card = styled("div", {
  maxWidth: "100%",
  borderRadius: "15px",
  backgroundColor: "rgba(255, 255, 255)",
  boxShadow: "0px 10px 20px 0px rgba(179, 187, 198, 0.45)",
  padding: 22,
  margin: "0 auto",
  "@bp768": {
    maxWidth: "98%",
    padding: 10,
  },
});

const H1 = styled("h1", {
  marginBottom: 15,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontWeight: 600,
  fontSize: 15,
  margin: "0 auto 1.5rem",
  "@bp1024": {
    fontSize: 18,
    marginTop: 10,
  },
  "@bp640": {
    fontSize: 16,
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

const EmailButton = styled("button", {
  fontSize: 17,
  backgroundColor: "#0d69f3",
  color: colors.white,
  fontWeight: "bold",
  textAlign: "center",
  height: 50,
  borderRadius: 15,
  width: "100%",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#0052CC",
  },
});

const SocialMediaContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  marginTop: 20,
  height: 120,
});

const SocialMediaButton = styled("button", {
  borderRadius: 30,
  width: "50%",
  padding: 15,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: colors.white,
  cursor: "pointer",
  variants: {
    type: {
      whatsapp: {
        backgroundColor: "#25D366",
        "&:hover": {
          backgroundColor: "#0ead4a",
        },
      },
      telegram: {
        backgroundColor: "#0088cc",
        "&:hover": {
          backgroundColor: "#076695",
        },
      },
    },
  },
});

const CustomLink = styled(Link, {
  padding: "10px 20px",
  fontSize: 14,
  backgroundColor: "DodgerBlue",
  borderRadius: 10,
  color: "White",
  textTransform: "capitalize",
  fontWeight: "bold",
  width: "50%",
  textAlign: "center",
  "&:hover": {
    textDecoration: "underline",
    backgroundColor: "#024f99",
  },
});

export default ExchangeOverview;
