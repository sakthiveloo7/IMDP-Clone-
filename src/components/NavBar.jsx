import React from "react";
import { Link } from "react-router-dom";
import imdbIcon from "../assets/imdb_icon.png";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg px-5 navigation-bar bg-dark">
      <Link className="navbar-brand" to={"/"}>
        <img src={imdbIcon} alt="Logo" />
      </Link>
      <div className="ms-auto">
        <Link to={"/login"}>
          <button className="btn btn-warning" type="button">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
