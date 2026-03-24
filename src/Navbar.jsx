import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "./assets/book_hub_logo.svg";

const Navbar = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("jwt_token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="Book Hub" className="logo" />
      </div>

      <ul className="nav-right">
        <li>
          <Link to="/home" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/bookshelves" className="nav-link">Bookshelves</Link>
        </li>
        <li>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
