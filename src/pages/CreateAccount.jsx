import React, { memo, useEffect } from "react";
import { blueA } from "@radix-ui/colors";
import { NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import Container from "../components/container";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import { styled } from "../common/stitches";
import routes from "../common/routes";
import AuthFormContainer from "../components/forms/AuthFormContainer";
import toastStore from "../store/toastStore";
import { useCreateAccount } from "../hooks/useSession";
import appStore from "../store/appStore";

const schema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string()
    .required("No password provided.")
    .min(4, "Password is too short - should be 4 chars minimum."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  agreed: Yup.bool().oneOf([true], "You must accept our terms and conditions"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const { mutate, data, isError, error, isLoading } = useCreateAccount();
  const addNotification = toastStore((state) => state.add);
  const { isLogin, user } = appStore((state) => ({
    isLogin: state.isLogin,
    user: state.user,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (user) => {
    mutate(user);
  };

  useEffect(() => {
    if (isDirty) {
      for (const key in errors) {
        addNotification({
          title: "Required",
          message: errors[key].message,
          type: "error",
        });
      }
    }
  }, [addNotification, errors, isDirty]);

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
    if (isLogin) {
      user.role.toLowerCase() === "admin"
        ? navigate(routes.admin.exchange)
        : navigate(routes.home);
    }

    if (data?.uid) {
      addNotification({
        title: "Signup Successful",
        message: "Your signup was successful",
        type: "success",
      });
      navigate("/login");
    }
  }, [data, addNotification, navigate, isLogin, user?.role]);

  return (
    <Main>
      <Container>
        <Header />
      </Container>
      <Container width="dynamic" add="headerMargin" style={{ flex: 1 }}>
        <FormContainer>
          <AuthFormContainer
            title="create account"
            handleSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
          >
            <FormControl label="Email address" htmlFor="email">
              <Input
                id="email"
                placeholder="example@example.com"
                type="text"
                {...register("email")}
                disabled={isLoading}
              />
            </FormControl>
            <FormControl label="Password" htmlFor="password">
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                {...register("password")}
                disabled={isLoading}
              />
            </FormControl>
            <FormControl label="Confirm Password" htmlFor="new-password">
              <Input
                id="new-password"
                type="password"
                placeholder="Enter password"
                {...register("confirmPassword")}
                disabled={isLoading}
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
                  id="agree"
                  type="checkbox"
                  {...register("agreed")}
                  disabled={isLoading}
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

const Main = styled("div", {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

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
