import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MovieList from "./components/MoviList";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Actors from "./components/Actors";
import Producer from "./components/Producer";
import Movies from "./components/Movies";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Route */}
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="/producers" element={<Producer />} />
          </>
        ) : (
          <>
            <Route
              path="/dashboard/*"
              element={<Navigate to="/login" replace />}
            />
          </>
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
