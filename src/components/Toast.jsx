import { useState } from "react";
import { keyframes } from "@stitches/react";
import * as Toast from "@radix-ui/react-toast";
import { blackA, green, mauve, red, slate, violet } from "@radix-ui/colors";

import toastStore from "../store/toastStore";
import { styled } from "../common/stitches";
import colors from "../common/colors";

export default function Index({ title, message, id, type }) {
  const [open, setOpen] = useState(true);

  const deleteNotification = toastStore((state) => state.delete);

  const onOpenChange = (open) => {
    setOpen(open);
    deleteNotification(id || "");
  };

  return (
    <ToastRoot
      open={open}
      duration={5000}
      type={type}
      onOpenChange={onOpenChange}
    >
      {title && (
        <Header>
          <ToastTitle>{title}</ToastTitle>
          <ToastAction asChild altText="Goto schedule to undo">
            <Button
              size="small"
              variant={type === "error" ? "violet" : "green"}
            >
              OK
            </Button>
          </ToastAction>
        </Header>
      )}

      {message && (
        <ToastDescription asChild>
          <p>{message}</p>
        </ToastDescription>
      )}
    </ToastRoot>
  );
}

const VIEWPORT_PADDING = 25;

export const ToastProvider = styled(Toast.Provider, {});
export const ToastViewport = styled(Toast.Viewport, {
  position: "fixed",
  bottom: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
  padding: VIEWPORT_PADDING,
  gap: 10,
  width: 390,
  maxWidth: "100vw",
  margin: 0,
  listStyle: "none",
  zIndex: 2147483647,
  outline: "none",
});

const hide = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

const slideIn = keyframes({
  from: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
  to: { transform: "translateX(0)" },
});

const swipeOut = keyframes({
  from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
});

const Header = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const ToastRoot = styled(Toast.Root, {
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  padding: 15,
  display: "grid",
  gridTemplateAreas: '"title action" "description action"',
  gridTemplateColumns: "auto max-content",
  columnGap: 15,
  alignItems: "center",

  '&[data-state="open"]': {
    animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${hide} 100ms ease-in`,
  },
  '&[data-swipe="move"]': {
    transform: "translateX(var(--radix-toast-swipe-move-x))",
  },
  '&[data-swipe="cancel"]': {
    transform: "translateX(0)",
    transition: "transform 200ms ease-out",
  },
  '&[data-swipe="end"]': {
    animation: `${swipeOut} 100ms ease-out`,
  },

  variants: {
    type: {
      success: {
        backgroundColor: "rgb(37, 211, 102)",
        color: colors.white,
      },
      error: {
        backgroundColor: red.red10,
        color: colors.white,
      },
      info: {
        backgroundColor: colors.white,
        color: slate.slate12,
      },
    },
  },
  defaultVariants: {
    type: "info",
  },
});

const ToastTitle = styled(Toast.Title, {
  gridArea: "title",
  marginBottom: 5,
  fontWeight: 500,
  fontSize: 15,
  textTransform: "capitalize",
});

const ToastDescription = styled(Toast.Description, {
  gridArea: "description",
  margin: 0,
  fontSize: 13,
  lineHeight: 1.3,
});

const ToastAction = styled(Toast.Action, {
  gridArea: "action",
});

const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  fontWeight: 500,
  cursor: "pointer",

  variants: {
    size: {
      small: {
        fontSize: 12,
        padding: "0 10px",
        lineHeight: "25px",
        height: 25,
      },
      large: {
        fontSize: 15,
        padding: "0 15px",
        lineHeight: "35px",
        height: 35,
      },
    },
    variant: {
      violet: {
        backgroundColor: "white",
        color: violet.violet11,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        "&:hover": { backgroundColor: mauve.mauve3 },
        "&:focus": { boxShadow: `0 0 0 2px black` },
      },
      green: {
        backgroundColor: green.green2,
        color: green.green11,
        boxShadow: `inset 0 0 0 1px ${green.green7}`,
        "&:hover": { boxShadow: `inset 0 0 0 1px ${green.green8}` },
        "&:focus": { boxShadow: `0 0 0 2px ${green.green8}` },
      },
    },
  },

  defaultVariants: {
    size: "large",
    variant: "violet",
  },
});
