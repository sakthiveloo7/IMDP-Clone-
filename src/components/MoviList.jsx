import React, { useState } from "react";
import movies from "../data/movieList";
import NavBar from "./NavBar";

function MoviList() {
  const [movieList, setMovieList] = useState(movies);

  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Movie List */}
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {movieList.map((movie) => (
            <div key={movie._id} className="col">
              <div className="card bg-dark text-white h-100">
                <img
                  src={movie.poster}
                  className="card-img-top"
                  alt={movie.name}
                />
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{movie.name}</h5>
                  <h6 className="mb-0">{movie.yearOfRelease}</h6>
                </div>
                <div className="card-body">
                  <p>
                    <strong className="text-warning">Director:</strong>{" "}
                    {movie.director}
                  </p>
                  <p>
                    <strong className="text-warning">Producer:</strong>{" "}
                    {movie.producer.name}
                  </p>
                  <p>
                    <strong className="text-warning">Cast:</strong>{" "}
                    {movie.actors.map((a, i) => (
                      <span key={i}>
                        {a.name}
                        {i < movie.actors.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                  <p>
                    <strong className="text-warning">Plot:</strong> {movie.plot}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MoviList;
