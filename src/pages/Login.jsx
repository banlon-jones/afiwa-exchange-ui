import React, { useState } from "react";
import { blueA } from "@radix-ui/colors";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import Container from "../components/container";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import { styled } from "../common/stitches";
import { NavLink } from "react-router-dom";
import routes from "../common/routes";
import AuthFormContainer from "../components/forms/AuthFormContainer";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    password_type: "password",
  });

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const togglePassword = () => {
    if (state.password_type === "password") {
      setState((prevState) => ({
        ...prevState,
        password_type: "text",
      }));
      return;
    }
    setState((prevState) => ({
      ...prevState,
      password_type: "password",
    }));
  };

  const { email, password, password_type } = state;

  return (
    <Main>
      <Container>
        <Header />
      </Container>
      <Container width="dynamic" add="headerMargin">
        <FormContainer>
          <AuthFormContainer title="login">
            <FormControl label="Email address" htmlFor="email">
              <Input
                id="email"
                placeholder="example@example.com"
                name="email"
                type="text"
                onChange={handleChange}
                value={email}
              />
            </FormControl>
            <FormControl label="Password" htmlFor="password" forget_password>
              <Input
                id="password"
                name="password"
                type={password_type}
                onChange={handleChange}
                value={password}
                placeholder="Enter password"
              />
              <HideShowButton onClick={togglePassword}>
                {password_type === "password" ? (
                  <FaRegEyeSlash />
                ) : (
                  <FaRegEye />
                )}
              </HideShowButton>
            </FormControl>
          </AuthFormContainer>
        </FormContainer>
      </Container>
      <Container>
        <Footer />
      </Container>
    </Main>
  );
};

const CustomNavLink = styled(NavLink, {
  color: blueA.blueA10,
  textDecoration: "underline",
});

const Main = styled("div", {});

const FormContainer = styled("div", {
  margin: "0 auto",
  maxWidth: "400px",
  minHeight: "37vh",
  "@bp768": {
    minHeight: "100%",
  },
  "@bp640": {
    maxWidth: "90%",
  },
  "@bp400": {
    maxWidth: "98%",
  },
});

const FormControl = ({ label, htmlFor, children, forget_password }) => {
  return (
    <FormWrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <label htmlFor={htmlFor}>{label}</label>
        {forget_password && (
          <CustomNavLink to={routes.reset_password}>
            forget password
          </CustomNavLink>
        )}
      </div>
      {children}
    </FormWrapper>
  );
};

const FormWrapper = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 5,
  marginTop: 10,
});

const Input = styled("input", {
  width: "100%",
  height: 40,
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

const HideShowButton = styled("div", {
  position: "absolute",
  right: 10,
  bottom: "17%",
  cursor: "pointer",
});

export default Login;
