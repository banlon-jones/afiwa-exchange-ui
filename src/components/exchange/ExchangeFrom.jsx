import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FaExchangeAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

import { styled } from "../../common/stitches";
import { useGetCurrency } from "../../hooks/useCurrency";
import Box from "../box";
import appStore from "../../store/appStore";
import routes from "../../common/routes";
import { calculateExchangeAmount } from "../../common/utils";
import { Spinner } from "../spinner/Spinner";
// import toastStore from "../../store/toastStore";
import CopyToClipboard from "../CopyToClipboard";

const ExchangeFrom = () => {
  // const addNotification = toastStore((state) => state.add);
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isError, isLoading } = useGetCurrency();
  const [options, setOptions] = useState([]);
  const [tnxInfo, setTnxInfo] = useState({
    fromCurrency: location.state?.tnxInfo
      ? location.state.tnxInfo.fromCurrency
      : "Number",
    toCurrency: location.state?.tnxInfo
      ? location.state.tnxInfo.toCurrency
      : "Number",
  });
  const isLogin = appStore((state) => state.isLogin);

  const [state, setState] = useState({
    fromCurrency: location.state?.fromCurrency
      ? location.state.fromCurrency
      : {},
    toCurrency: location.state?.toCurrency ? location.state.toCurrency : {},
    fromAmount: location.state?.fromAmount ? location.state.fromAmount : "",
    toAmount: location.state?.toAmount ? location.state.toAmount : "",
    recipientName: location.state?.recipientName
      ? location.state.recipientName
      : "",
    recipientWallet: location.state?.recipientWallet
      ? location.state.recipientWallet
      : "",
    exchangeRate: location.state?.exchangeRate
      ? location.state.exchangeRate
      : 0,
  });
  const [baseExchangeRate, setBaseExchangeRate] = useState({});

  const handleChange = (event) => {
    const value = numericInputValidator(event);

    setState((prevState) => ({
      ...prevState,
      [event.target.name]: value,
    }));
  };

  const numericInputValidator = (event) => {
    if (event.target.name === "fromAmount") {
      const reg = new RegExp("^[-+]?[0-9]*.?[0-9]*$");
      if (reg.test(event.target.value)) return event.target.value;
    } else return event.target.value;
  };

  const handleSelectChange = (newValue, actionMeta) => {
    setState((prevState) => ({
      ...prevState,
      [actionMeta.name]: newValue,
    }));

    if (
      (actionMeta.name === "fromCurrency" && state.fromAmount === "") ||
      state.fromAmount === "0"
    ) {
      setState((prevState) => ({
        ...prevState,
        fromAmount: 1,
      }));
    }

    const isMomo = String(newValue.symbol).toLowerCase() === "xaf";
    setTnxInfo((prevState) => ({
      ...prevState,
      [actionMeta.name]: isMomo ? "Number" : "Wallet Address",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isLogin) {
      return navigate(routes.login, { state: { ...state, tnxInfo: tnxInfo } });
    }

    localStorage.removeItem("stuff");
    return navigate(routes.exchange_details, {
      state: { ...state, tnxInfo: tnxInfo },
    });
  };

  useEffect(() => {
    if (
      Object.keys(state.fromCurrency).length > 0 &&
      Object.keys(state.toCurrency).length > 0
    ) {
      const [rate, amount] = calculateExchangeAmount(
        state.fromCurrency.rate,
        state.toCurrency.rate,
        state.fromAmount
      );

      setState((prevState) => ({
        ...prevState,
        exchangeRate: rate,
        toAmount: amount,
      }));
    }
  }, [state.toCurrency, state.fromCurrency, state.fromAmount]);

  useEffect(() => {
    if (data !== undefined) {
      const _object = Object.entries(data)
        .filter((_obj) => _obj[1].active === "true")
        .map((_obj) => {
          if (String(_obj[1].code).toLowerCase() === "usdt")
            setBaseExchangeRate(_obj[1]);
          return {
            value: _obj[1].id,
            label: _obj[1].name,
            id: _obj[1].id,
            rate: parseFloat(_obj[1].rate),
            logo: String(_obj[1].logo).startsWith("http") ? _obj[1].logo : null,
            wallet: _obj[1].wallet,
            code: _obj[1].code,
            symbol: _obj[1].symbol,
          };
        });
      setOptions(_object);
    }
  }, [data, location.state]);

  useEffect(() => {}, [tnxInfo]);

  if (isError) return;

  return (
    <From onSubmit={handleSubmit} justifyContentCenter={isLoading}>
      {isLoading ? (
        <div className="h-[1100%] min-h-[40vh] flex w-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div style={{ gridArea: "send", width: "100%" }}>
            <Label htmlFor="react-select-2-input">Send</Label>
            <div>
              <Select
                required
                styles={colourStyles}
                isSearchable
                options={options}
                name="fromCurrency"
                onChange={handleSelectChange}
                defaultValue={
                  Object.keys(state.fromCurrency).length > 0
                    ? state.fromCurrency
                    : ""
                }
                formatOptionLabel={(coin) => (
                  <OptionLabel className="coin-option">
                    {coin["logo"] ? (
                      <OptionLabelLogo src={coin.logo} alt="coin" />
                    ) : (
                      <Box
                        style={{ width: 30, backgroundColor: "dodgerblue" }}
                      />
                    )}
                    <span>{coin.label}</span>
                  </OptionLabel>
                )}
              />
              <Input
                value={state.fromAmount}
                name="fromAmount"
                type="number"
                onChange={handleChange}
                inputMode="numeric"
                pattern="[0-9]+"
                required
              />
              {Object.keys(state.fromCurrency).length > 0 && (
                <p style={{ color: "#757575", padding: 3 }}>
                  <span>{baseExchangeRate["symbol"]}</span>1 ={" "}
                  <span>
                    {state.fromCurrency["symbol"]}
                    {calculateExchangeAmount(
                      baseExchangeRate["rate"],
                      state.fromCurrency["rate"],
                      1
                    )[0].toPrecision(4)}{" "}
                  </span>
                </p>
              )}
            </div>
          </div>
          <div style={{ gridArea: "icon", justifySelf: "center" }}>
            <FaExchangeAlt color="green" />
          </div>
          {Object.keys(state.fromCurrency).length > 0 && (
            <div style={{ gridArea: "wallet", margin: "10px 0" }}>
              <Label>Deposit {tnxInfo?.fromCurrency}</Label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 5,
                  alignItems: "center",
                }}
              >
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
                <CopyToClipboard
                  text={state.fromCurrency.wallet}
                  style={{
                    borderRadius: 8,
                    marginTop: 5,
                    fontSize: 17,
                    padding: "14px 15px",
                  }}
                />
              </div>
            </div>
          )}
          <div style={{ gridArea: "receive", width: "100%" }}>
            <Label htmlFor="react-select-3-input">Receive</Label>
            <div>
              <Select
                required
                styles={colourStyles}
                isSearchable
                options={options}
                name="toCurrency"
                onChange={handleSelectChange}
                defaultValue={
                  Object.keys(state.toCurrency).length > 0
                    ? state.toCurrency
                    : ""
                }
                formatOptionLabel={(coin) => (
                  <OptionLabel className="coin-option">
                    {coin["logo"] ? (
                      <OptionLabelLogo src={coin.logo} alt="coin" />
                    ) : (
                      <Box
                        style={{ width: 30, backgroundColor: "dodgerblue" }}
                      />
                    )}
                    <span>{coin.label}</span>
                  </OptionLabel>
                )}
              />
              <Input
                value={!isNaN(state.toAmount) ? state.toAmount : 0}
                name="toAmount"
                type="number"
                inputMode="numeric"
                pattern="[0-9]+"
                disabled
                required
              />
              {Object.keys(state.toCurrency).length > 0 && (
                <p style={{ color: "#757575", padding: 3 }}>
                  <span>{baseExchangeRate["symbol"]}</span>1 ={" "}
                  <span>
                    {state.toCurrency["symbol"]}
                    {calculateExchangeAmount(
                      baseExchangeRate["rate"],
                      state.toCurrency["rate"],
                      1
                    )[0].toPrecision(4)}{" "}
                  </span>
                </p>
              )}
            </div>
          </div>
          <div style={{ gridArea: "recipient" }}>
            <Label htmlFor="recipientName">
              Recipient {tnxInfo.toCurrency}
            </Label>
            <InputFlexWrapper>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 5,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Input2
                  name="recipientName"
                  type="text"
                  placeholder="Recipient Name"
                  onChange={handleChange}
                  value={state.recipientName}
                  required
                />
                <CopyToClipboard
                  text={state.recipientName}
                  style={{
                    borderRadius: 8,
                    marginTop: 5,
                    fontSize: 17,
                    padding: "16px 15px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 5,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Input2
                  value={state.recipientWallet}
                  name="recipientWallet"
                  type="text"
                  placeholder={`Recipient ${tnxInfo?.toCurrency}`}
                  onChange={handleChange}
                  required
                />
                <CopyToClipboard
                  text={state.recipientWallet}
                  style={{
                    borderRadius: 8,
                    marginTop: 5,
                    fontSize: 17,
                    padding: "16px 15px",
                  }}
                />
              </div>
            </InputFlexWrapper>
            <Submit type="submit">Exchange</Submit>
          </div>
        </>
      )}
    </From>
  );
};

const From = styled("form", {
  flex: "1 1 auto",
  maxWidth: "60%",
  display: "grid",
  gridTemplateAreas: `'send send icon receive receive'
  'wallet wallet wallet wallet wallet'
  'recipient recipient recipient recipient recipient'
  `,
  columnGap: "1em",
  borderRadius: "15px",
  background: "rgba(255, 255, 255, 0.00)",
  boxShadow: "0px 10px 20px 0px rgba(179, 187, 198, 0.45)",
  padding: 22,
  alignItems: "center",
  "@bp1024": {
    maxWidth: "100%",
  },
  "@bp640": {
    padding: 10,

    gridTemplateAreas: `'send send send'
    'icon icon icon'
    'receive receive receive'
    'wallet wallet wallet'
    'recipient recipient recipient'`,
  },
  variants: {
    justifyContentCenter: {
      true: {
        justifyContent: "center",
      },
    },
  },
});

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    height: 53,
    borderRadius: 10,
  }),
  input: (styles) => ({
    ...styles,
    marginLeft: 3,
  }),
};

const Label = styled("label", {
  fontSize: 22,
  fontWeight: "bold",
  marginBottom: 5,
  "@bp1024": {
    fontSize: 18,
  },
  "@bp640": {
    fontSize: 16,
  },
});

const OptionLabel = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 3,
});

const OptionLabelLogo = styled("img", {
  height: 30,
  width: 30,
  objectFit: "contain",
});

const Input = styled("input", {
  width: "100%",
  height: 53,
  borderRadius: 8,
  marginTop: 13,
  backgroundColor: "#F1F2F5",
  borderColor: "#d7d7d7",
  fontSize: 17,
  color: "rgb(33 32 32)",
  "@bp1024": {
    fontSize: 18,
    height: 45,
  },
});

const Input2 = styled("input", {
  width: "100%",
  height: 50,
  borderRadius: 8,
  backgroundColor: "#F1F2F5",
  borderColor: "#d7d7d7",
  marginTop: 5,
  fontSize: 17,
  color: "rgb(33 32 32)",
  "@bp1024": {
    fontSize: 16,
    height: 45,
  },
});

const Submit = styled("button", {
  height: 50,
  textAlign: "center",
  backgroundColor: "dodgerblue",
  color: "white",
  width: "100%",
  borderRadius: 8,
  marginTop: 12,
  "@bp1024": {
    fontSize: 18,
    height: 45,
  },
  "@bp640": {
    fontSize: 16,
  },
});

const InputFlexWrapper = styled("div", {
  display: "flex",
  gap: 12,
  "@bp400": {
    flexWrap: "wrap",
  },
});

export default ExchangeFrom;
