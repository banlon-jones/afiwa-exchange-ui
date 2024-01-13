import React, { memo } from "react";
import { blueA } from "@radix-ui/colors";
import { NavLink } from "react-router-dom";

import routes from "../../common/routes";
import { styled } from "../../common/stitches";

const AuthFormContainer = ({ title, children, handleSubmit }) => {
  return (
    <>
      <H1>{title}</H1>
      <Form onSubmit={handleSubmit}>
        {children}
        <Submit type="submit">{title}</Submit>
        <p style={{ marginTop: 20, fontSize: 14 }}>
          {title !== "login" ? (
            <>
              Having an account?{" "}
              <CustomNavLink to={routes.login}>Login</CustomNavLink>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <CustomNavLink to={routes.create_account}>
                Create account
              </CustomNavLink>
            </>
          )}
        </p>
      </Form>
    </>
  );
};

const H1 = styled("h1", {
  color: "#191919",
  leadingTrim: "both",
  textEdge: "cap",
  fontSize: 20,
  fontWeight: 700,
  lineHeight: "normal",
  letterSpacing: -0.28,
  textTransform: "capitalize",
});

const Form = styled("form", {});

const CustomNavLink = styled(NavLink, {
  color: blueA.blueA10,
  textDecoration: "underline",
});

const Submit = styled("button", {
  height: 40,
  textAlign: "center",
  backgroundColor: "dodgerblue",
  color: "white",
  width: "100%",
  borderRadius: 10,
  marginTop: 12,
  textTransform: "capitalize",
  "@bp1024": {
    fontSize: 18,
    height: 45,
  },
  "@bp640": {
    fontSize: 16,
  },
});

export default memo(AuthFormContainer);
