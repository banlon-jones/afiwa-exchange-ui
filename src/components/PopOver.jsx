import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { violet, blackA } from "@radix-ui/colors";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { NavLink } from "react-router-dom";

import routes from "../common/routes";
import Button from "./buttons/button";
import { styled } from "../common/stitches";

const MenuToggleBar = ({ className }) => (
  <Popover.Root className={className}>
    <Popover.Trigger asChild className={className}>
      <IconButton aria-label="Toggle menubar">
        <MixerHorizontalIcon width={25} height={25} />
      </IconButton>
    </Popover.Trigger>
    <Popover.Portal>
      <PopoverContent sideOffset={5} id="public-header-popover-content">
        <Flex css={{ flexDirection: "column", gap: 5 }}>
          <NavLink to={routes.exchange} style={{ display: "block" }}>
            Echange
          </NavLink>
          <NavLink to={routes.rates} style={{ display: "block" }}>
            Rates
          </NavLink>
          <NavLink to={routes.reviews} style={{ display: "block" }}>
            Reviews
          </NavLink>
          <NavigationMenuRoot>
            <NavigationMenuList>
              <NavigationMenu.Item>
                <NavigationMenuLink href={routes.login} type="empty">
                  <Button
                    style={{
                      padding: "7px 25px",
                      border: "1px solid dodgerblue",
                      marginBottom: 5,
                    }}
                  >
                    Login
                  </Button>
                </NavigationMenuLink>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenuLink href={routes.create_account} type="empty">
                  <Button color="blue" style={{ padding: "7px 25px" }}>
                    Create account
                  </Button>
                </NavigationMenuLink>
              </NavigationMenu.Item>
            </NavigationMenuList>
          </NavigationMenuRoot>
        </Flex>
      </PopoverContent>
    </Popover.Portal>
  </Popover.Root>
);

const PopoverContent = styled(Popover.Content, {
  borderRadius: 4,
  backgroundColor: "white",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  animationDuration: "400ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
});

const Flex = styled("div", {
  display: "flex",
  "& > a": {
    padding: "10px 15px",
    fontSize: 14,
    "&:hover": {
      backgroundColor: "#3a9bf944",
    },
  },
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

const NavigationMenuRoot = styled(NavigationMenu.Root, {
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  paddingLeft: 11,
});

const NavigationMenuList = styled(NavigationMenu.List, {
  display: "flex",
  justifyContent: "center",
  backgroundColor: "white",
  padding: 4,
  borderRadius: 6,
  listStyle: "none",
  margin: 0,
  gap: 10,
});

const NavigationMenuLink = styled(NavigationMenu.Link, {
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

export default MenuToggleBar;
