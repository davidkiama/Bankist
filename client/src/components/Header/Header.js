import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import decode from "jwt-decode";

import "./Header.css";

function Header() {
  const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("profile")));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUserProfile(null);

    navigate("/");
  };

  useEffect(() => {
    const token = userProfile?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUserProfile(JSON.parse(localStorage.getItem("profile")));
  }, [navigate]);

  return (
    <header className="header">
      <div className="logo">
        <h1 className="logo__name heading-1">
          <Link to="">Bankist</Link>
        </h1>
      </div>

      <div className="header__btns">
        {userProfile ? (
          <>
            <Link to="dashboard" className="btn header__btn">
              Dashboard
            </Link>

            {/* <Link to="dashboard" className="btn header__btn">
              Add funds
            </Link> */}

            <Link to="profile" className="btn header__btn">
              Profile
            </Link>

            <button className="btn btn--logout" onClick={logout}>
              <img src="/svg/shutdown.svg" alt="Logout" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="signin" className="btn header__btn">
              Login
            </Link>

            <Link to="signup" className="btn header__btn">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
