import React from "react";
import "./Button.css";

const Button = ({ children, text, handleClick, grey, small, disabled, account }) => {
  const isConnected = !!account; // Comprobar wallet conectada
  return (
    <button
      className={`btn ${grey && "grey"} ${small && "small"} ${isConnected ? "connected" : ""}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children || (isConnected ? `0x...${account.substring(account.length - 8)}` : text)}
    </button>
  );
};

export default Button;
