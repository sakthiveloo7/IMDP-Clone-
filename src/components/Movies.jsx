import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoviesAsync,
  selectAllMovies,
  selectMovieLoading,
  selectMovieError,
} from "../slice/movieSlice";
import { getActorsAsync } from "../slice/actorSlice";
import { getProducersAsync } from "../slice/producerSlice";
import MovieCard from "./MovieCard";
import CreateMovieModal from "./modals/CreateMovieModal";

function Movies() {
  const dispatch = useDispatch();
  const movies = useSelector(selectAllMovies);
  const loading = useSelector(selectMovieLoading);
  const error = useSelector(selectMovieError);
  const actors = useSelector((state) => state.actor.actors);
  const producers = useSelector((state) => state.producer.producers);

  const [showCreateMovieModal, setShowCreateMovieModal] = useState(false);

  useEffect(() => {
    dispatch(fetchMoviesAsync());
    dispatch(getActorsAsync());
    dispatch(getProducersAsync());
  }, [dispatch]);

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <div className="mb-4 w-100 d-flex justify-content-between align-items-center">
        <h2 className="text-uppercase">Movies List</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateMovieModal(true)}
        >
          <i className="bi bi-plus-lg"></i> Add Movie
        </button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center">Loading...</div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : movies.length === 0 ? (
        <p className="text-danger fs-4 text-center w-100">There is no movie to display</p>
      ) : (
        <div className="row gx-4 row-cols-1 row-cols-md-2 row-cols-xl-4 justify-content-start w-100">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}

      {/* Correct Modal */}
      <CreateMovieModal
        show={showCreateMovieModal}
        onClose={() => setShowCreateMovieModal(false)}
        actors={actors}
        producers={producers}
      />
    </div>
  );
}

export default Movies;

