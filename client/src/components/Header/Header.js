import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h1 className="logo__name heading-1">
          <Link to="">Bankist</Link>
        </h1>
      </div>

      <div className="header__btns">
        <Link to="dashboard" className="btn header__btn">
          Dashboard
        </Link>

        <Link to="signin" className="btn header__btn">
          Login
        </Link>

        <Link to="signup" className="btn header__btn">
          Register
        </Link>
      </div>
    </header>
  );
}

export default Header;
