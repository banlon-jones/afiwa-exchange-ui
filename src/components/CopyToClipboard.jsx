import React from "react";
import { MdContentCopy } from "react-icons/md";

import toastStore from "../store/toastStore";

const CopyToClipboard = ({ style, text }) => {
  const addNotification = toastStore((state) => state.add);

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    addNotification({
      title: "Info",
      message: "Successfully copied",
      type: "info",
    });
  };

  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        backgroundColor: "rgb(241, 242, 245)",
        color: "rgb(33, 32, 32)",
        ...style,
      }}
      onClick={() => handleCopyToClipboard(text)}
    >
      <MdContentCopy />
    </span>
  );
};

export default CopyToClipboard;
