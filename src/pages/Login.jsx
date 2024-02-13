import React, { useEffect, useState } from "react";
import { blueA } from "@radix-ui/colors";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import Container from "../components/container";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import { styled } from "../common/stitches";
import routes from "../common/routes";
import AuthFormContainer from "../components/forms/AuthFormContainer";
import toastStore from "../store/toastStore";
import { useLogin } from "../hooks/useSession";
import appStore from "../store/appStore";

const schema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string()
    .required("No password provided.")
    .min(4, "Password is too short - should be 4 chars minimum."),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [passwordType, setpasswordType] = useState("password");
  const addNotification = toastStore((state) => state.add);
  const { isLogin, user, setUser } = appStore((state) => ({
    isLogin: state.isLogin,
    user: state.user,
    setUser: state.setUser,
  }));

  const { mutate, data, isError, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (user) => {
    mutate([user, setUser]);
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
        message: "Invalid Credentials",
        type: "error",
      });
    }
  }, [isError, addNotification]);

  useEffect(() => {
    if (isLogin) {
      user.role.toLowerCase() === "admin"
        ? navigate(routes.admin.exchange)
        : navigate(routes.home, { state: location.state });
    }

    if (data !== undefined) {
      addNotification({
        title: "Successful",
        message: `You are successfully logged in as ${data.email}`,
        type: "success",
      });

      data.role.toLowerCase() === "admin"
        ? navigate(routes.admin.exchange)
        : navigate(routes.home, { state: location.state });
    }
  }, [data, navigate, addNotification, isLogin, user?.role, location.state]);

  const togglePassword = () => {
    if (passwordType === "password") {
      setpasswordType("text");
      return;
    }
    setpasswordType("text");
  };

  return (
    <Main>
      <Container>
        <Header />
      </Container>
      <Container width="dynamic" add="headerMargin" style={{ flex: 1 }}>
        <FormContainer>
          <AuthFormContainer
            title="login"
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
            <FormControl label="Password" htmlFor="password" forget_password>
              <Input
                id="password"
                type={passwordType}
                placeholder="Enter password"
                {...register("password")}
                disabled={isLoading}
              />
              <HideShowButton onClick={togglePassword}>
                {passwordType === "password" ? <FaRegEyeSlash /> : <FaRegEye />}
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

const Main = styled("div", {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

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

const HideShowButton = styled("div", {
  position: "absolute",
  right: 10,
  bottom: "17%",
  cursor: "pointer",
});

export default Login;
