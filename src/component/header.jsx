import "./header.scss";
import { Button } from "antd";
import React from "react";
import { deckStateToBase64 } from "utils";

export const Header = ({ deckState }) => {
  const copyShareLinkToClipBoard = () => {
    const base64String = deckStateToBase64(deckState);
    navigator.clipboard.writeText("localhost:3000/" + base64String);
  };

  return (
    <div className="header">
      <Button
        type="default"
        onClick={() => {
          copyShareLinkToClipBoard();
        }}
      >
        Share
      </Button>
    </div>
  );
};
