import logo from "../../../../assets/logo.png";

import Button from "../../../../components/Button";

import NavBar from "./components/NavBar";

import "./Header.css";

const Header = () => {
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
        <Button handleClick={() => {}} text="CONNECT WALLET" />
      </div>
    </header>
  );
};

export default Header;