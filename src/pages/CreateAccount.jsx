import React, { memo, useState } from "react";
import { blueA } from "@radix-ui/colors";
import { NavLink } from "react-router-dom";

import Container from "../components/container";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import { styled } from "../common/stitches";
import routes from "../common/routes";
import AuthFormContainer from "../components/forms/AuthFormContainer";
import { useRequestProcessor } from "../api/requestProcessor";
import { signup } from "../api/auth";

import { useQuery } from "react-query";
import client from "../api/client";

const SignUp = () => {
  const { Mutate } = useRequestProcessor();

  const [user, setUser] = useState({
    email: "",
    password: "",
    confirm_password: "",
    agree: false,
  });

  const handleChange = (event) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Mutate("user", () => signup(user)).mutate();
  };

  const { email, password, confirm_password, agree } = user;

  return (
    <Main>
      <Container>
        <Header />
      </Container>
      <Container width="dynamic" add="headerMargin">
        <FormContainer>
          <AuthFormContainer title="create account" handleSubmit={handleSubmit}>
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
            <FormControl label="Password" htmlFor="password">
              <Input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                value={password}
                placeholder="Enter password"
              />
            </FormControl>
            <FormControl label="Confirm Password" htmlFor="new-password">
              <Input
                id="new-password"
                name="confirm_password"
                type="password"
                onChange={handleChange}
                value={confirm_password}
                placeholder="Enter password"
              />
            </FormControl>
            <FormControl>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  fontSize: 14,
                  margin: "10px 0",
                }}
              >
                <input
                  style={{ cursor: "pointer", borderRadius: 10 }}
                  type="checkbox"
                  id="agree"
                  name="agree"
                  value={agree}
                  onChange={() =>
                    setUser((prevState) => ({
                      ...prevState,
                      agree: !prevState.agree,
                    }))
                  }
                />
                <label htmlFor="agree">
                  I agree to the{" "}
                  <CustomNavLink to={routes.terms_of_service}>
                    Terms & Privacy
                  </CustomNavLink>
                </label>
              </div>
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
  "@bp400": {
    maxWidth: "98%",
  },
});

const FormControl = ({ label, htmlFor, children }) => {
  return (
    <FormWrapper>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      {children}
    </FormWrapper>
  );
};

const FormWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 5,
  marginTop: 10,
});

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

export default memo(SignUp);
