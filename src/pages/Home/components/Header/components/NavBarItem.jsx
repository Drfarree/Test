import "./NavBarItem.css";

const NavBarItem = ({ item, selected, handleClick }) => {
  return (
    <li
      onClick={handleClick}
      className={`nav-list-item text-white ${
        selected === item ? "selected" : ""
      }`}
    >
      {item}
    </li>
  );
};

export default NavBarItem;