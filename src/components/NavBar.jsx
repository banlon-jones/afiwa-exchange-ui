import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { styled } from "@stitches/react";

const NavBar = ({ children, className }) => {
  return (
    <NavigationMenuRoot className={className}>
      <NavigationMenuList>{children}</NavigationMenuList>
    </NavigationMenuRoot>
  );
};

const NavigationMenuRoot = styled(NavigationMenu.Root, {
  position: "relative",
  display: "flex",
  justifyContent: "center",
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

export default NavBar;
