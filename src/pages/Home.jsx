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
      <Container width="dynamic" add="headerMargin">
        <Exchange />
        <Wrapper title="Recent Exchanges">
          <RecentExchanges />
        </Wrapper>
        <Wrapper title="Reviews">
          <Reviews />
        </Wrapper>
        <Wrapper title="Our Reserve">
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
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  "@bp640": {
    display: "block",
  },
});
