import React, { useEffect } from "react";
import { blackA } from "@radix-ui/colors";
import { RxCross2 } from "react-icons/rx";
import { MdContentCopy } from "react-icons/md";

import { styled } from "../../common/stitches";
import colors from "../../common/colors";
import ExchangeProgressBar from "./ExchangeProgressBar";
import toastStore from "../../store/toastStore";
import { ImWhatsapp } from "react-icons/im";
import { FaTelegramPlane } from "react-icons/fa";
import { useGetTransactionById } from "../../hooks/useTransaction";

const ExchangeOverview = ({
  transactionId,
  handleCloseOverlay,
  socialMediaContants,
}) => {
  const addNotification = toastStore((state) => state.add);
  const { data, isError } = useGetTransactionById(transactionId);

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    addNotification({
      title: "INFO",
      message: "Copied",
    });
  };

  if (data === undefined || isError) return;

  return (
    <OverLayer>
      <CardContainer>
        <Card>
          <H1>
            Transaction ID: {data.transactionId}{" "}
            <RxCross2
              style={{ cursor: "pointer" }}
              onClick={handleCloseOverlay}
            />
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
  // "@bp1430": {
  //   maxWidth: "85%",
  // },
  // "@bp1024": {
  //   maxWidth: "90%",
  // },
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
  fontSize: 16,
  width: "90%",
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

const Input = styled("input", {
  minWidth: "50%",
  border: "1px solid #E0E1E5",
  padding: "2px 10px",
  display: "inline-block",
  fontSize: 17,
  backgroundColor: "#0052CC",
  color: colors.white,
  fontWeight: "bold",
  textAlign: "center",
  height: 50,
  borderRadius: 15,
  width: "100%",
  "@bp1024": {
    fontSize: 14,
    height: 35,
    width: 250,
  },
  "@bp640": {
    width: "100%",
  },
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

export default ExchangeOverview;
