import React, { useState } from "react";
import Panel from "./Panel";
import { styled } from "../../common/stitches";
import toastStore from "../../store/toastStore";
import appStore from "../../store/appStore";

const Password = () => {
  const { logout } = appStore((state) => ({ logout: state.logout }));
  const addNotification = toastStore((state) => state.add);
  const [updatePassword, setUpdatePassword] = useState({
    password: "",
    new_password: "",
  });

  const handleChange = (event) => {
    setUpdatePassword((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (updatePassword.password === "" || updatePassword.new_password === "") {
      addNotification({
        title: "Info",
        message: "password can not be empty",
        type: "info",
      });
      return;
    }
    console.log(updatePassword);

    addNotification({
      title: "Update Successful",
      message: "Password succesfully updated",
      type: "success",
    });

    logout();
  };

  return (
    <Panel active="password">
      <Form onSubmit={handleSubmit}>
        <FormControl htmlFor="password" label="Password">
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Enter old password"
            value={updatePassword.password}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl htmlFor="new_password" label="New Password">
          <Input
            id="new_password"
            type="password"
            name="new_password"
            placeholder="New password"
            value={updatePassword.new_password}
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

export default Password;
