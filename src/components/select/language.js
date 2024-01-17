import React from "react";
import * as Select from "@radix-ui/react-select";
import { blackA, violet, mauve } from "@radix-ui/colors";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

import { styled } from "../../common/stitches";

const SelectLanguage = () => {
  return (
    <Select.Root>
      <SelectTrigger aria-label="Select Language">
        <Select.Value placeholder="EN" />
        <SelectIcon>
          <ChevronDownIcon />
        </SelectIcon>
      </SelectTrigger>
      <Select.Portal>
        <SelectContent>
          <SelectViewport>
            <Select.Group>
              <SelectItem value="english">EN</SelectItem>
              <SelectItem value="french">FR</SelectItem>
            </Select.Group>
          </SelectViewport>
        </SelectContent>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectLanguage;

const SelectTrigger = styled(Select.SelectTrigger, {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: 0,
  fontSize: 15,
  lineHeight: 1,
  height: 35,
  backgroundColor: "white",
  color: blackA.blackA10,
});

const SelectIcon = styled(Select.SelectIcon, {
  color: blackA.blackA10,
});

const SelectContent = styled(Select.Content, {
  overflow: "hidden",
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
  zIndex: 3,
});

const SelectViewport = styled(Select.Viewport, {
  padding: 5,
});

const SelectItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <StyledItem {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <StyledItemIndicator>
        <CheckIcon />
      </StyledItemIndicator>
    </StyledItem>
  );
});

const StyledItem = styled(Select.Item, {
  fontSize: 13,
  lineHeight: 1,
  color: blackA.blackA10,
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 35px 0 25px",
  position: "relative",
  userSelect: "none",

  "&[data-disabled]": {
    color: mauve.mauve8,
    pointerEvents: "none",
  },

  "&[data-highlighted]": {
    outline: "none",
    backgroundColor: violet.violet9,
    color: violet.violet1,
  },
});

const StyledItemIndicator = styled(Select.ItemIndicator, {
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});
