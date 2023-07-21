import "./Button.css";

const Button = ({ children, text, handleClick, grey, small }) => {
  return (
    <button
      className={`btn ${grey && "grey"} ${small && "small"}`}
      onClick={handleClick}
    >
      {children || text}
    </button>
  );
};

export default Button;