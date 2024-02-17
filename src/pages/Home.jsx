import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { styled } from "../common/stitches";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import Container from "../components/container";
import Exchange from "../components/home/Exchange";
import RecentExchanges from "../components/home/RecentExchanges";
import Reviews from "../components/home/Reviews";
import OurReserve from "../components/home/OurReserve";

import Wrapper from "../components/home/Wrapper";
import routes from "../common/routes";

export default function Index() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]);

  return (
    <Main>
      <Container>
        <Header />
      </Container>
      <Container width="dynamic" add="headerMargin" style={{ flex: 1 }}>
        <Exchange />
        <Wrapper title="Recent Exchanges" url={routes.exchange}>
          <RecentExchanges />
        </Wrapper>
        <Wrapper title="Reviews" url={routes.reviews}>
          <Reviews />
        </Wrapper>
        <Wrapper title="Our Reserve" url={routes.reviews}>
          <OurReserve />
        </Wrapper>
      </Container>
      <Container>
        <Footer />
      </Container>
    </Main>
  );
}

const Main = styled("main", {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  "@bp640": {
    display: "block",
  },
});
