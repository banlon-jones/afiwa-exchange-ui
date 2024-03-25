import React from "react";
import { NavLink } from "react-router-dom";
import { blackA } from "@radix-ui/colors";

import { styled } from "../../common/stitches";
import logo from "../../assets/logo.png";

import Container from "../container";
import routes from "../../common/routes";
import appStore from "../../store/appStore";
import { Accounts } from "../../constants/Accounts";

const Footer = () => {
  const { isLogin, logout } = appStore((state) => ({
    isLogin: state.isLogin,
    logout: state.logout,
  }));

  return (
    <FooterContainer>
      <Container width="dynamic">
        <Grid>
          <Address>
            <NavLink to={routes.home}>
              <Img src={logo} type="logo" alt="Afiwa Exchange" />
            </NavLink>
            <InfoLine>
              <p>whatsapp: {Accounts.whatsapp_number}</p>
              <p>telegram: {Accounts.telegram_number}</p>
            </InfoLine>
          </Address>
          <LinkContainer gridArea="about_us">
            <H2>about us</H2>
            <LinkWrapper>
              <NavLink to={routes.terms_of_service}>Terms of Service</NavLink>
              <NavLink to={routes.privacy_policy}>Privacy Policy</NavLink>
              {/* <NavLink to={routes.about_us}>About Us</NavLink> */}
            </LinkWrapper>
          </LinkContainer>
          <LinkContainer gridArea="quick_link">
            <H2>quick links</H2>
            <LinkWrapper>
              <NavLink to={routes.faq}>FAQ</NavLink>
              <NavLink to={routes.news}>News</NavLink>
              <NavLink to={routes.customer_reviews}>Customer Review</NavLink>
              <NavLink to={routes.affiliate}>Affiliate Program</NavLink>
            </LinkWrapper>
          </LinkContainer>
          <LinkContainer gridArea="account">
            <H2>account</H2>
            <LinkWrapper>
              <NavLink to={routes.profile}>Manage Account</NavLink>
              {!isLogin ? (
                <>
                  <NavLink to={routes.login}>Login</NavLink>
                  <NavLink to={routes.create_account}>Regiser</NavLink>
                </>
              ) : (
                <NavLink onClick={() => logout()}>Logout</NavLink>
              )}
              <NavLink to={routes.exchange}>My Exchanges</NavLink>
              <NavLink to={routes.profile}>Profile</NavLink>
            </LinkWrapper>
          </LinkContainer>
        </Grid>
        <CopyRights>
          <p>2023 AFIWA, All rights reserved</p>
        </CopyRights>
      </Container>
    </FooterContainer>
  );
};

const Grid = styled("div", {
  display: "grid",
  gridTemplateAreas: `'address about_us quick_link account'`,
  fontSize: 15,
  gap: 40,
  justifyContent: "space-between",
  paddingBottom: "1em",
  "@bp1024": {
    gap: 20,
  },
  "@bp768": {
    gridTemplateAreas: `'about_us quick_link account'
    'address address address'
    `,
  },
  "@bp400": {
    gridTemplateAreas: `'about_us quick_link'
    'account address'
    `,
  },
});

const FooterContainer = styled("div", {
  marginTop: "5rem",
  padding: "3em 0 0",
  borderTop: "1px solid",
  borderColor: blackA.blackA2,
  color: "#757575",
});

const Img = styled("img", {
  variants: {
    type: {
      logo: { borderRadius: 5 },
    },
  },
});

const Address = styled("div", {
  display: "flex",
  gap: 10,
  flexDirection: "column",
  color: "#757575",
  maxWidth: 300,
  gridArea: "address",
  "@bp768": {
    maxWidth: "100%",
    gap: 10,
  },
});

const InfoLine = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  "@bp768": {
    width: "100%",
  },
  "@bp400": {
    flexWrap: "wrap",
    gap: 5,
  },
});

const LinkContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  variants: {
    gridArea: {
      about_us: {
        gridArea: "about_us",
      },
      quick_link: {
        gridArea: "quick_link",
      },
      account: {
        gridArea: "account",
      },
    },
  },
});

const H2 = styled("h2", {
  fontWeight: "bold",
  textTransform: "uppercase",
  color: blackA.blackA10,
  marginBottom: 10,
});

const LinkWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  color: "#757575",
  gap: 10,
});

const CopyRights = styled("div", {
  padding: "2em 0",
  borderTop: "1px solid",
  borderColor: blackA.blackA2,
  display: "flex",
  justifyContent: "center",
  "@bp1024": {
    padding: "1.5rem 0",
    fontSize: 14,
  },
});

export default Footer;
