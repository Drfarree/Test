import { useState } from "react";
import NavBarItem from "./NavBarItem";

import "./NavBar.css";

const NAV_ITEMS = ["INICIO", "SERVICIOS", "INFORMACION", "SWAP"];

const NavBar = () => {
  const [selected, setSelected] = useState(NAV_ITEMS[0]);

  return (
    <nav className="top-header_nav">
      <ul className="top-header_nav-list">
        {NAV_ITEMS.map((item) => (
          <NavBarItem
            key={item}
            item={item}
            selected={selected}
            handleClick={() => setSelected(item)}
          />
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;