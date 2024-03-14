import React, { memo } from "react";
import { blackA, violet } from "@radix-ui/colors";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { NavLink, Link } from "react-router-dom";

import { styled } from "../../common/stitches";
import logo from "../../assets/logo.png";
import Icons from "../icon";
import NavBar from "../NavBar";
import Button from "../buttons/button";
import routes from "../../common/routes";
import Container from "../container";
import SelectLanguage from "../select/language";
import MenuToggleBar from "../PopOver";
import "../../style/popover.module.css";
import appStore from "../../store/appStore";

const header = () => {
  const { isLogin, logout } = appStore((state) => ({
    isLogin: state.isLogin,
    logout: state.logout,
  }));

  return (
    <Header>
      <Wrapper width="dynamic">
        <Flex style={{ justifyContent: "space-between" }}>
          <Flex type="lang">
            <NavLink to={routes.home}>
              <Img src={logo} type="logo" alt="Afiwa Exchange" />
            </NavLink>
            <Flex style={{ alignItems: "center", cursor: "pointer" }}>
              <Icons name="language" />
              <SelectLanguage />
            </Flex>
          </Flex>
          <NavBar className="disable">
            <NavigationMenu.Item>
              <NavigationMenuLink to={routes.exchange}>
                Exchange
              </NavigationMenuLink>
            </NavigationMenu.Item>
            {/* <NavigationMenu.Item>
              <NavigationMenuLink to={routes.rates}>Rates</NavigationMenuLink>
            </NavigationMenu.Item> */}
            <NavigationMenu.Item>
              <NavigationMenuLink to={routes.reviews}>
                Reviews
              </NavigationMenuLink>
            </NavigationMenu.Item>
          </NavBar>
          <NavBar className="disable">
            {!isLogin ? (
              <>
                <NavigationMenu.Item>
                  <NavigationMenuLink to={routes.login} type="empty">
                    <Button
                      style={{
                        padding: "7px 25px",
                        border: "1px solid dodgerblue",
                      }}
                    >
                      Login
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenuLink to={routes.create_account} type="empty">
                    <Button color="blue" style={{ padding: "7px 25px" }}>
                      Create account
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenu.Item>
              </>
            ) : (
              <Button
                style={{
                  padding: "7px 25px",
                  border: "1px solid dodgerblue",
                }}
                onClick={() => logout()}
              >
                Logout
              </Button>
            )}
          </NavBar>
          <MenuToggleBar className="enable" />
        </Flex>
      </Wrapper>
    </Header>
  );
};

const Wrapper = styled(Container, {
  ".enable": {
    display: "none",
  },
  "@bp768": {
    ".disable": {
      display: "none",
    },
    ".enable": {
      display: "inline-flex",
    },
  },
});

const Flex = styled("div", {
  display: "flex",
  variants: {
    type: {
      lang: {
        gap: 50,
        "@bp768": {
          gap: 20,
        },
      },
    },
  },
});

const Header = styled("div", {
  padding: "10px 0",
  borderBottom: "1px solid",
  borderColor: blackA.blackA2,
  position: "fixed",
  backgroundColor: "white",
  zIndex: 2,
  width: "100%",
  top: 0,
  "@bp1024": {
    fontSize: 14,
  },
});

const Img = styled("img", {
  variants: {
    type: {
      logo: { borderRadius: 5 },
    },
  },
});

const NavigationMenuLink = styled(Link, {
  outline: "none",
  userSelect: "none",
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: 4,
  fontSize: 16,
  color: blackA.blackA10,
  display: "block",
  textDecoration: "none",

  "@bp1024": {
    fontSize: 14,
  },

  variants: {
    type: {
      navLink: {
        padding: "10px 12px",
        "&:focus": { boxShadow: `0 0 0 2px ${violet.violet7}` },
        "&:hover": { backgroundColor: "#3a9bf944" },
      },
    },
  },

  defaultVariants: {
    type: "navLink",
  },
});

export default memo(header);
