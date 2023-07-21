import React, { useEffect, useState } from "react";
import logo from "../../../../assets/logo.png";
import Button from "../../../../components/Button";
import NavBar from "./components/NavBar";
import "./Header.css";

import { ethers } from "ethers";
import walletIcon from "../../../../assets/wallet.png";



const Header = () => {

  const [account, setAccount] = useState("");

  const handleWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);


    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="top-header">
      <div className="top-header_logo-wrapper">
        <img src={logo} alt="logo" className="logo-wrapper_logo" />
        <h4 className="logo-wrapper_text text-white">FED AI</h4>
      </div>
      <NavBar />
      <div className="top-header_buttons-wrapper">
        <Button grey>
          <span>🌍</span>NETWORK
        </Button>
        <button
          className={`wallet-button ${account ? "connected" : ""}`}
          onClick={handleWallet}
          disabled={!!account}
        >
          <span className="wallet-icon">
            <img src={walletIcon} alt="Wallet" className="wallet-icon-img" />
          </span>
          {account ? `0x...${account.substring(account.length - 8)}` : "CONNECT WALLET"}
        </button>
      </div>
    </header>
  );
};

export default Header;