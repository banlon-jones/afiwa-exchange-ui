import React, { useEffect, useState } from "react";
import Panel from "./Panel";
import { styled } from "../../common/stitches";
import toastStore from "../../store/toastStore";
import appStore from "../../store/appStore";
import { useUpdateUserPassword } from "../../hooks/useSession";
import { NavLink } from "react-router-dom";
import routes from "../../common/routes";

const Password = () => {
  const { mutate, data, isError, error } = useUpdateUserPassword();
  const { user, logout } = appStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));
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

    if (updatePassword.password !== updatePassword.new_password) {
      addNotification({
        title: "Password mismatch",
        message: "New password and Confirm password do not match",
        type: "error",
      });
      return;
    }

    mutate({ email: user.email, password: updatePassword.new_password });
  };

  useEffect(() => {
    if (isError) {
      addNotification({
        title: "Error",
        message: error.response.data.message,
        type: "error",
      });
    }
  }, [error?.response, isError, addNotification]);

  useEffect(() => {
    if (data?.uid) {
      addNotification({
        title: "Password Changed",
        message:
          "Your password was changed successfully \nPlease login to continue",
        type: "success",
      });

      setTimeout(() => {
        logout();
      }, 5000);
    }
  }, [data, addNotification, logout]);

  return (
    <Panel active="password">
      <Form onSubmit={handleSubmit}>
        <FormControl htmlFor="password" label="Password">
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={updatePassword.password}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl htmlFor="new_password" label="Confirm New Password">
          <Input
            id="new_password"
            type="password"
            name="new_password"
            placeholder="Confirm New Password"
            value={updatePassword.new_password}
            onChange={handleChange}
          />
        </FormControl>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Button>save changes</Button>
          <NavLink to={routes.home}>
            <Button type="outline">back home</Button>
          </NavLink>
        </div>
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
  transition: "all 0.2s ease-in-out",
  textTransform: "capitalize",
  "@bp1024": {
    padding: "5px 15px",
  },
  variants: {
    type: {
      outline: {
        backgroundColor: "transparent",
        border: "1px solid lightgrey",
        color: "gray",
        "&:hover": {
          transform: "scale(0.9)",
        },
      },
    },
  },
});

export default Password;
