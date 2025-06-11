import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../slice/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import IMDBIcon from "../assets/imdb_icon.png";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setErr("All fields are required!");
      return;
    }

    const result = await dispatch(signupUser(formData));

    if (signupUser.fulfilled.match(result)) {
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } else {
      setErr(result.payload || "Signup failed");
    }
  };

  return (
    <div className="signup-main-div d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="signup-div bg-white shadow p-4 rounded d-flex flex-column align-items-center"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <img src={IMDBIcon} alt="imdb_icon" width={50} className="mb-3" />
        <h3 className="mb-3">Sign Up</h3>

        <div className="form-group w-100 mb-3">
          <label htmlFor="username">Username</label>
          <input
            required
            type="text"
            name="username"
            id="username"
            className="form-control"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

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

        {(err || error) && (
          <p className="text-danger w-100 text-center">{err || error}</p>
        )}

        <button type="submit" className="btn btn-warning w-100 mt-2" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        <Link to="/login" className="mt-3 text-decoration-none text-dark">
          Already have an account? <span className="text-decoration-underline">Login</span>
        </Link>
      </form>
    </div>
  );
}

export default Signup;
