import React, { useEffect } from "react";
import { styled } from "../../common/stitches";
import Panel from "./Panel";
import appStore from "../../store/appStore";
import { useState } from "react";
import toastStore from "../../store/toastStore";
import { useUpdateUserProfile } from "../../hooks/useSession";

const General = () => {
  const { mutate, data, error, isError } = useUpdateUserProfile();
  const addNotification = toastStore((state) => state.add);
  const { user, setUser } = appStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const [updateUser, setUpdateUser] = useState({
    fullName: user.fullName,
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
      user.fullName === updateUser.fullName &&
      user.phoneNumber === updateUser.phoneNumber
    ) {
      addNotification({
        title: "Info",
        message: "No updates found",
        type: "info",
      });
      return;
    }

    mutate({ ...updateUser, email: user.email });
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
        title: "Profile updated",
        message: "Your profile was updated successfully",
        type: "success",
      });

      setUser({
        user: {
          ...user,
          fullName: updateUser.fullName,
          phoneNumber: updateUser.phoneNumber,
        },
      });
    }
  }, [data, addNotification]); // eslint-disable-line

  return (
    <Panel active="general">
      <Form onSubmit={handleSubmit}>
        <FormControl
          htmlFor="fullName"
          label="Full Name"
          style={{ width: "100%" }}
        >
          <Input
            id="fullName"
            type="text"
            name="fullName"
            placeholder="John Doe"
            value={updateUser.fullName}
            onChange={handleChange}
            style={{ width: "100%" }}
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

const FormControl = ({ label, htmlFor, children, ...props }) => {
  return (
    <FormWrapper {...props}>
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
