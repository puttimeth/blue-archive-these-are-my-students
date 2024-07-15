import "./header.scss";
import { Button, message } from "antd";
import React from "react";
import { MdHelpOutline, MdOutlineSettings } from "react-icons/md";
import { deckStateToBase64 } from "utils";

export const Header = ({
  deckState,
  setConfigModalStatus,
  setHelpModalStatus,
}) => {
  const copyShareLinkToClipBoard = () => {
    const base64String = deckStateToBase64(deckState);
    navigator.clipboard.writeText("localhost:3000/" + base64String);
    message.info("Shareable link is copied to clipboard.");
  };

  return (
    <div className="header">
      <Button
        className="icon-btn config-btn"
        onClick={() => {
          setConfigModalStatus(true);
        }}
      >
        <MdOutlineSettings />
      </Button>
      <div>
        <Button
          type="default"
          onClick={() => {
            copyShareLinkToClipBoard();
          }}
        >
          Share
        </Button>
        <Button
          className="icon-btn"
          onClick={() => {
            setHelpModalStatus(true);
          }}
        >
          <MdHelpOutline />
        </Button>
      </div>
    </div>
  );
};
