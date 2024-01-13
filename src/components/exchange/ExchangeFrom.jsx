import React, { useState } from "react";
import Select from "react-select";
import { FaExchangeAlt } from "react-icons/fa";

import { styled } from "../../common/stitches";

const options = [
  { value: "chocolate", label: "Perfect Money USD", color: "#00B8D9" },
  { value: "strawberry", label: "Perfect Money BTC", color: "#0052CC" },
  { value: "vanilla", label: "Perfect Money ETC", color: "#5243AA" },
];

const ExchangeFrom = () => {
  const [state, setState] = useState({
    sendAmount: 1,
    receiveAmount: 1,
    recipientName: "",
    recipientNumber: "",
    sendTransactionType: options[0].value,
    receiveTransactionType: options[1].value,
  });

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSelectChange = (newValue, actionMeta) => {
    setState((prevState) => ({
      ...prevState,
      [actionMeta.name]: newValue.value,
    }));
  };

  const { sendAmount, receiveAmount, recipientName, recipientNumber } = state;

  return (
    <From>
      <div style={{ gridArea: "send", width: "100%" }}>
        <Label htmlFor="react-select-2-input">Send</Label>
        <div>
          <Select
            required
            styles={colourStyles}
            isSearchable
            isClearable
            options={options}
            name="sendTransactionType"
            defaultValue={options[0]}
            onChange={handleSelectChange}
          />
          <Input
            value={sendAmount}
            name="sendAmount"
            type="number"
            onChange={handleChange}
          />
          <p style={{ color: "#757575", padding: 3 }}>1USD = 590 FCFA</p>
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
            isClearable
            options={options}
            name="receiveTransactionType"
            defaultValue={options[1]}
            onChange={handleSelectChange}
          />
          <Input
            value={receiveAmount}
            name="receiveAmount"
            type="number"
            onChange={handleChange}
          />
          <p style={{ color: "#757575", padding: 3 }}>1USD = 590 FCFA</p>
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
            value={recipientName}
          />
          <Input2
            type="text"
            name="recipientNumber"
            value={recipientNumber}
            placeholder="Recipient Number"
            onChange={handleChange}
          />
        </InputFlexWrapper>
        <Submit type="submit">Exchange</Submit>
      </div>
    </From>
  );
};

const From = styled("form", {
  flex: "1 1 auto",
  maxWidth: "60%",
  display: "grid",
  gridTemplateAreas: `'send icon receive'
  'recipient recipient recipient'
  `,
  columnGap: "1em",
  borderRadius: "15px",
  background: "rgba(255, 255, 255, 0.00)",
  boxShadow: "0px 10px 20px 0px rgba(179, 187, 198, 0.45)",
  padding: 22,
  alignItems: "center",
  justifyContent: "space-between",
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
});

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 3,
    content: '" "',
    display: "block",
    marginRight: 8,
    width: 51,
    height: 30,
  },
});

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    height: 55,
    borderRadius: 10,
  }),
  option: (style) => ({ ...style, ...dot() }),
  input: (styles) => ({
    ...styles,
    ...dot(),
    marginLeft: 10,
  }),
  placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
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

const Input = styled("input", {
  width: "100%",
  height: 55,
  borderRadius: 8,
  marginTop: 13,
  backgroundColor: "#F1F2F5",
  borderColor: "#d7d7d7",
  fontSize: 24,
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
