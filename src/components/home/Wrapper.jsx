import React from "react";
import { Link } from "react-router-dom";

import { styled } from "../../common/stitches";

const Wrapper = ({ title, children, url }) => {
  return (
    <WrapperContainer>
      <H1>{title}</H1>
      <Container>
        {children}
        <div>
          <Link
            to={url}
            style={{
              padding: 0,
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            view more
          </Link>
        </div>
      </Container>
    </WrapperContainer>
  );
};

const WrapperContainer = styled("div", {
  marginTop: "5rem",
  "@bp1024": {
    marginTop: 70,
  },
  "@bp768": {
    marginTop: 35,
  },
});

const H1 = styled("h1", {
  fontSize: 22,
  fontWeight: "bold",
});

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

export default Wrapper;
