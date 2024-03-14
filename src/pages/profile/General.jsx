import React from "react";
import { styled } from "../../common/stitches";
import Panel from "./Panel";
import appStore from "../../store/appStore";
import { useState } from "react";
import toastStore from "../../store/toastStore";

const General = () => {
  const addNotification = toastStore((state) => state.add);
  const { user, setUser } = appStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const [updateUser, setUpdateUser] = useState({
    email: user.email,
    phoneNumber: user.phoneNumber,
  });

  const handleChange = (event) => {
    setUpdateUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      user.email === updateUser.email &&
      user.phoneNumber === updateUser.phoneNumber
    ) {
      addNotification({
        title: "Info",
        message: "No updates found",
        type: "info",
      });
      return;
    }

    console.log(updateUser);
  };

  return (
    <Panel active="general">
      <Form onSubmit={handleSubmit}>
        <FormControl htmlFor="email" label="Email">
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="example@example.com"
            value={updateUser.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl htmlFor="phoneNumber" label="Number">
          <Input
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            placeholder="+254 557248854"
            value={updateUser.phoneNumber}
            onChange={handleChange}
          />
        </FormControl>
        <Button>save changes</Button>
      </Form>
    </Panel>
  );
};

const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: 30,
});

const FormWrapper = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 5,
});

const FormControl = ({ label, htmlFor, children }) => {
  return (
    <FormWrapper>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </FormWrapper>
  );
};

const Input = styled("input", {
  width: "100%",
  height: 45,
  borderRadius: 10,
  backgroundColor: "#F1F2F5",
  borderColor: "#d7d7d7",
  fontSize: 14,
  padding: "0 10px",
  color: "black",
  "@bp1024": {
    fontSize: 13,
    height: 35,
  },
});

const Button = styled("button", {
  width: "fit-content",
  padding: "8px 20px",
  backgroundColor: "#4253F0",
  color: "white",
  borderRadius: 20,
  marginLeft: "auto",
  textTransform: "capitalize",
  "@bp1024": {
    padding: "5px 15px",
  },
});

export default General;
