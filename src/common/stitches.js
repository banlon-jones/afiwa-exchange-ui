import { createStitches } from "@stitches/react";

export const { styled, css } = createStitches({
  media: {
    bp400: "(max-width: 400px)",
    bp640: "(max-width: 640px)",
    bp768: "(max-width: 768px)",
    bp1024: "(max-width: 1024px)",
    bp1430: "(max-width: 1430px)",
    minpb1430: "(min-width: 1430px)",
  },
});
