import React from "react";
import { styled } from "../../common/stitches";
import colors from "../../common/colors";

const ExchangeProgressBar = ({ status }) => {
  let _status = String(status).toLowerCase();
  _status = _status === "pending" ? "sending" : _status;

  return (
    <ProgresBarContainer>
      <ProgressStateWrapper>
        <ProgressState state={_status === "pending"}>1</ProgressState>
        <ProgressState state={_status === "sending"}>2</ProgressState>
        <ProgressState state={_status === "complete" || _status === "canceled"}>
          3
        </ProgressState>
      </ProgressStateWrapper>
      <ProgressStatusWrapper>
        <Status status={_status}>
          {_status}{" "}
          <DotContainer>
            <Span></Span>
          </DotContainer>
        </Status>
      </ProgressStatusWrapper>
    </ProgresBarContainer>
  );
};

const ProgresBarContainer = styled("div", {});

const ProgressStateWrapper = styled("ul", {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  color: "#757575",
});

const ProgressState = styled("li", {
  padding: "5px 13px",
  borderRadius: "50%",
  backgroundColor: "#F1F2F5",
  color: "inherit",
  variants: {
    state: {
      true: {
        backgroundColor: "#4253F0",
        color: colors.white,
      },
    },
  },
});

const ProgressStatusWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  color: "#757575",
  margin: "1.5rem 0",
});

const Status = styled("div", {
  padding: "10px 10px 10px 15px",
  borderRadius: 30,
  backgroundColor: "rgb(219 220 223)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: 18,
  textTransform: "capitalize",
  variants: {
    status: {
      pending: {
        backgroundColor: "#FCFF80",
      },
      sending: {
        backgroundColor: "#FCFF80",
      },
      completed: {
        backgroundColor: "#66D48F",
        color: colors.white,
      },
      canceled: {
        backgroundColor: "#ff0505",
        color: colors.white,
      },
    },
  },
});

const DotContainer = styled("div", {
  marginLeft: 20,
  padding: "8px 10px",
  backgroundColor: colors.white,
  borderRadius: 30,
  width: 48,
});

const Span = styled("span", {
  display: "block",
  position: "relative",
  backgroundColor: "#757575",
  width: 5,
  height: 5,
  borderRadius: "50%",
  "&::before,&::after": {
    position: "absolute",
    content: "' '",
    display: "inline-block",
    backgroundColor: "#757575",
    width: "inherit",
    height: "inherit",
    borderRadius: "50%",
    left: 10,
  },
  "&::after": {
    left: 20,
  },
});

export default ExchangeProgressBar;
