import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slice/authSlice";
import { useNavigate, Link } from "react-router-dom";
import IMDBIcon from "../assets/imdb_icon.png";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (email && password) {
      dispatch(loginUser({ email, password }));
    }
  };

  return (
    <div className="login-main-div d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="login-div bg-white shadow p-4 rounded d-flex flex-column align-items-center"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <img src={IMDBIcon} alt="imdb_icon" width={50} className="mb-3" />
        <h3 className="mb-3">Sign In</h3>

        <div className="form-group w-100 mb-3">
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group w-100 mb-3">
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-danger w-100 text-center">{error}</p>}

        <button type="submit" className="btn btn-warning w-100 mt-2" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <Link to="/signup" className="mt-3 text-decoration-underline text-dark">
          Create Account
        </Link>

        <Link to={'/'} className="mt-3 text-decoration-underline text-dark">
          Home
        </Link>
      </form>
    </div>
  );
}

export default Login;
