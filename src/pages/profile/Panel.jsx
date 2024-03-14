import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../../common/routes";
import { styled } from "../../common/stitches";
import Footer from "../../components/home/Footer";

const Panel = ({ active, children }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Container>
        <PanelContainer>
          <Nav>
            <NavItem active={active === "general"}>
              <NavLink to={routes.profile}>General</NavLink>
            </NavItem>
            <NavItem active={active === "password"}>
              <NavLink to={routes.change_password}>Password</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={routes.exchange}>Transactions</NavLink>
            </NavItem>
          </Nav>
        </PanelContainer>
        <Main>{children}</Main>
      </Container>
      <div style={{ marginTop: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

const Container = styled("div", {
  maxWidth: "900px",
  width: "100%",
  margin: "3em auto",
  padding: 15,
  display: "flex",
  alignItems: "flex-start",
  gap: 50,
  color: "#757575",
  "@bp1024": {
    gap: 25,
  },
  "@bp640": {
    gap: 0,
    padding: 5,
  },
});

const PanelContainer = styled("div", {});

const Nav = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

const NavItem = styled("li", {
  padding: 10,
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  "&:hover": {
    color: "#555555",
  },
  variants: {
    active: {
      true: {
        fontWeight: 900,
        color: "black",
      },
    },
  },
});

const Main = styled("main", {
  width: "100%",
  padding: "10px 20px",
  "@bp640": {
    padding: 10,
  },
});

export default Panel;
