import { blueA } from "@radix-ui/colors";

import colors from "../../common/colors";
import { styled } from "../../common/stitches";

const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  textWrap: "nowrap",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 25,
  cursor: "pointer",
  width: "fit-content",

  variants: {
    size: {
      normal: { fontSize: 16 },
    },
    color: {
      blue: {
        backgroundColor: blueA.blueA10,
        color: colors.white,
        "&:hover": { backgroundColor: blueA.blueA8 },
      },
      default: {
        color: blueA.blueA10,
        backgroundColor: colors.white,
        "&:hover": { backgroundColor: blueA.blueA3 },
      },
    },
  },

  defaultVariants: {
    color: "default",
  },
});

export default Button;
