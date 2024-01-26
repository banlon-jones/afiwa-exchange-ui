import { styled } from "../common/stitches";

const Container = styled("div", {
  margin: "0 auto",
  width: "100%",

  variants: {
    add: {
      headerMargin: {
        marginTop: "4.3rem",
        paddingTop: 70,
        "@bp1024": {
          paddingTop: 60,
        },
        "@bp768": {
          marginTop: "3.9rem",
          paddingTop: 35,
        },
      },
    },
    width: {
      dynamic: {
        "@minpb1430": {
          width: 1382,
        },
        "@bp1430": {
          width: "95%",
        },
        "@bp640": {
          width: "98%",
        },
      },
      admin: {
        width: "98%",
      },
    },
  },
});

export default Container;
