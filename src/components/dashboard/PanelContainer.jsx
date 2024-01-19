import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineDashboard, MdOutlineCurrencyExchange } from "react-icons/md";

import { styled } from "../../common/stitches";
import PanelHeader from "./PanelHeader";
import routes from "../../common/routes";
import appStore from "../../store/appStore";

const PanelContainer = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [togglePanel, setTogglePanel] = useState(false);
  const isLogin = appStore((state) => state.isLogin);

  const handleTogglePanel = () => {
    setTogglePanel(!togglePanel);
  };

  useEffect(() => {
    if (!isLogin) navigate(routes.login);
  }, [isLogin, navigate]);

  return (
    <>
      <PanelHeader handleTogglePanel={handleTogglePanel} />
      <Container>
        <PanelWrapper toggle={togglePanel}>
          <PanelRoot toggle={togglePanel}>
            <PanelItem>
              <PanelLink
                to={routes.admin.dashboard}
                active={location.pathname.endsWith(routes.admin.dashboard)}
              >
                <MdOutlineDashboard size={24} />
                {!togglePanel && <p>Dashboard</p>}
              </PanelLink>
            </PanelItem>
            <PanelItem>
              <PanelLink
                to={routes.admin.exchange}
                active={location.pathname.endsWith(routes.admin.exchange)}
              >
                <MdOutlineCurrencyExchange size={24} />
                {!togglePanel && <p>Exchanges</p>}
              </PanelLink>
            </PanelItem>
          </PanelRoot>
        </PanelWrapper>
      </Container>
      <Container>
        <Wrapper toggle={togglePanel}>{children}</Wrapper>
      </Container>
    </>
  );
};

const Container = styled("div", {
  transition: "all linear 1s",
});

const PanelWrapper = styled("div", {
  width: 280,
  overflow: "hidden",
  position: "fixed",
  left: 0,
  bottom: 0,
  height: "calc(100vh - 3.9rem)",
  variants: {
    toggle: {
      true: {
        width: 70,
      },
    },
  },
});

const PanelRoot = styled("ul", {
  padding: "3rem 1rem",
  display: "flex",
  flexDirection: "column",
  gap: 10,
  variants: {
    toggle: {
      true: {
        padding: "3rem 0.5rem",
      },
    },
  },
});

const PanelItem = styled("div", {});

const PanelLink = styled(Link, {
  display: "flex",
  gap: 10,
  alignItems: "center",
  fontWeight: "bold",
  fontSize: 16,
  padding: "10px 15px",
  borderRadius: 16,
  color: "#757575",
  "&:hover": {
    backgroundColor: "#EBECF0",
  },
  variants: {
    active: {
      true: {
        backgroundColor: "#EBECF0",
        color: "#4253F0",
      },
    },
  },
});

const Wrapper = styled("div", {
  width: "calc(100vw - 280px)",
  position: "absolute",
  right: 0,
  marginTop: "3.9rem",
  variants: {
    toggle: {
      true: {
        width: "calc(100vw - 70px)",
      },
    },
  },
});

export default PanelContainer;
