import React from "react";
import { styled } from "../../common/stitches";

const wrapper = ({ title, children }) => {
  return (
    <Wrapper>
      <H1>{title}</H1>
      <Container>
        {children}
        <div>
          <p
            style={{
              padding: 0,
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            view more
          </p>
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled("div", {
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

export default wrapper;
