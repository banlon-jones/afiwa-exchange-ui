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

const ExchangeFrom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isError, isLoading } = useGetCurrency();
  const [options, setOptions] = useState([]);
  const [recipientInfoPlaceholder, setRecipientInfoPlaceholder] =
    useState("Momo Number");
  const isLogin = appStore((state) => state.isLogin);

  const [state, setState] = useState({
    fromCurrency: location.state?.fromCurrency
      ? location.state?.fromCurrency
      : {},
    toCurrency: location.state?.toCurrency ? location.state?.toCurrency : {},
    fromAmount: location.state?.fromAmount ? location.state?.fromAmount : "",
    toAmount: location.state?.toAmount ? location.state?.toAmount : "",
    recipientName: location.state?.recipientName
      ? location.state?.recipientName
      : "",
    recipientWallet: location.state?.recipientWallet
      ? location.state?.recipientWallet
      : "",
    exchangeRate: location.state?.exchangeRate
      ? location.state?.exchangeRate
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

    if (actionMeta.name === "toCurrency") {
      const name = String(newValue.label);
      if (name.toLowerCase().search("xaf") === -1)
        setRecipientInfoPlaceholder("Wallet Address");
      else setRecipientInfoPlaceholder("Momo Number");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isLogin) {
      return navigate(routes.login, { state });
    }

    localStorage.removeItem("stuff");
    return navigate(routes.exchange_details, {
      state: { ...state, recipientMode: recipientInfoPlaceholder },
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
      const _object = Object.entries(data).map((_obj) => {
        if (_obj[1].name === "United state (USD)") setBaseExchangeRate(_obj[1]);

        return {
          value: _obj[1].id,
          label: _obj[1].name,
          id: _obj[1].id,
          rate: parseFloat(_obj[1].rate),
          logo: String(_obj[1].logo).startsWith("http") ? _obj[1].logo : null,
        };
      });
      setOptions(_object);
    }
  }, [data, location.state]);

  useEffect(() => {}, [recipientInfoPlaceholder]);

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
                  1 <span>{baseExchangeRate["name"]}</span> ={" "}
                  <span>
                    {calculateExchangeAmount(
                      baseExchangeRate["rate"],
                      state.fromCurrency["rate"],
                      1
                    )[0].toPrecision(4)}{" "}
                    {state.fromCurrency["label"]}
                  </span>
                </p>
              )}
            </div>
          </div>
          <div style={{ gridArea: "icon", justifySelf: "center" }}>
            <FaExchangeAlt color="green" />
          </div>
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
                  1 <span>{baseExchangeRate["name"]}</span> ={" "}
                  <span>
                    {calculateExchangeAmount(
                      baseExchangeRate["rate"],
                      state.fromCurrency["rate"],
                      1
                    )[0].toPrecision(4)}{" "}
                    {state.toCurrency["label"]}
                  </span>
                </p>
              )}
            </div>
          </div>
          <div style={{ gridArea: "recipient" }}>
            <Label htmlFor="recipientName">Recipient</Label>
            <InputFlexWrapper>
              <Input2
                name="recipientName"
                type="text"
                placeholder="Recipient Name"
                onChange={handleChange}
                value={state.recipientName}
                required
              />
              <Input2
                value={state.recipientWallet}
                name="recipientWallet"
                type="text"
                placeholder={`Recipient ${recipientInfoPlaceholder}`}
                onChange={handleChange}
                required
              />
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
