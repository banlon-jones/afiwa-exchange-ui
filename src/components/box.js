import { styled } from "../common/stitches";

const Box = styled("div", {
  width: 51,
  height: 30,
  borderRadius: 3,
  "@bp768": {
    display: "none",
  },
});

export default Box;
