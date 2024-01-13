import React from "react";
import { blackA, violet } from "@radix-ui/colors";
import * as Popover from "@radix-ui/react-popover";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { GiToggles } from "react-icons/gi";

import { styled } from "../../common/stitches";
import logo from "../../assets/logo.png";
import Icons from "../icon";
import Button from "../buttons/button";
import routes from "../../common/routes";
import Container from "../container";
import SelectLanguage from "../select/language";

const PanelHeader = ({ handleTogglePanel }) => {
  return (
    <Header>
      <Wrapper width="admin">
        <Flex style={{ justifyContent: "space-between" }}>
          <Flex type="lang" style={{ alignItems: "center" }}>
            <GiToggles
              size={25}
              cursor="pointer"
              onClick={handleTogglePanel}
              color="#161945"
            />
            <NavLink to={routes.admin.dashboard}>
              <Img src={logo} type="logo" alt="Afiwa Exchange" />
            </NavLink>
            <Flex style={{ alignItems: "center", cursor: "pointer" }}>
              <Icons name="language" />
              <SelectLanguage />
            </Flex>
          </Flex>
          <Popover.Root>
            <Popover.Trigger asChild>
              <IconButton aria-label="Toggle menubar">
                <CgProfile width={55} height={55} />
              </IconButton>
            </Popover.Trigger>
            <Popover.Portal>
              <PopoverContent
                sideOffset={5}
                style={{ maxWidth: "fit-content" }}
              >
                <Button color="blue" style={{ padding: "7px 25px" }}>
                  Logout
                </Button>
              </PopoverContent>
            </Popover.Portal>
          </Popover.Root>
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

const PopoverContent = styled(Popover.Content, {
  borderRadius: 4,
  backgroundColor: "white",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  animationDuration: "400ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
});

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 40,
  width: 40,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: violet.violet11,
  backgroundColor: "white",
  cursor: "pointer",
  "&:hover": { backgroundColor: violet.violet3 },
});

export default PanelHeader;
