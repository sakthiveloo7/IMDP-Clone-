import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import IMDBIcon from "../assets/imdb_icon.png";
import { useDispatch } from "react-redux";
import { logout } from "../slice/authSlice";
import Movies from "./Movies";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const checkToken = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <div className="dashboard-main-div d-flex flex-column min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4 py-3">
          <div className="container-fluid">
            <NavLink to="/" className="navbar-brand d-flex align-items-center">
              <img src={IMDBIcon} alt="imdb_icon" width="50" />
            </NavLink>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#dashboardNavbar"
              aria-controls="dashboardNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="dashboardNavbar">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center fs-5">
                <li className="nav-item">
                  <NavLink to="/actors" className="nav-link">Actors</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/producers" className="nav-link">Producers</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" onClick={handleLogout}>
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="flex-grow-1">
          <Movies />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
