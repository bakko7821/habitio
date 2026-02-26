import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <Link to="/">Home</Link> {" | "}
      <Link to="/profile">Profile</Link> {" | "}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          location.href = "/login";
        }}
      >
        Logout
      </button>
    </header>
  );
};
