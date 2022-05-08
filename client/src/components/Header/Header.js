import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h1 className="logo__name heading-1">Bankist</h1>
      </div>

      <div className="header__btns">
        <button className="btn header__btn">Login</button>
        <button className="btn header__btn">Register</button>
      </div>
    </header>
  );
}

export default Header;
