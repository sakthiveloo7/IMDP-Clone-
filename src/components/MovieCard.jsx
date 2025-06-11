import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteMovieAsync, fetchMoviesAsync } from "../slice/movieSlice";
import { toast } from "react-toastify";
import EditMovieModal from "./modals/EditMovieModal";

function MovieCard({ movie, actors, producers }) {
  const [showEditMovieModal, setShowEditMovieModal] = useState(false);
  const dispatch = useDispatch();

  const handleEditMovieModalShow = () => setShowEditMovieModal(true);
  const handleEditMovieModalClose = () => setShowEditMovieModal(false);

  const handleDelete = async () => {
    const resultAction = await dispatch(deleteMovieAsync(movie._id));
    if (deleteMovieAsync.fulfilled.match(resultAction)) {
      toast.success("Movie deleted successfully!");
      dispatch(fetchMoviesAsync());
    } else {
      toast.error("Failed to delete movie");
    }
  };

  return (
    <div className="col mb-5">
      <div className="card bg-dark text-white h-100">
        <img
          src={movie.poster}
          className="card-img-top"
          alt={movie.name || "Movie Poster"}
        />
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{movie.name}</h5>
          <h6 className="mb-0">{movie.yearOfRelease}</h6>
        </div>
        <div className="card-body">
          <p>
            <strong className="text-warning">Director:</strong> {movie.director}
          </p>
          <p>
            <strong className="text-warning">Producer:</strong>{" "}
            {movie.producer?.name || "Unknown"}
          </p>
          <p>
            <strong className="text-warning">Cast:</strong>{" "}
            {movie.actors && movie.actors.length > 0 ? (
              movie.actors.map((a) => (
                <span key={a?._id}>
                  {a?.name}
                  {a !== movie.actors[movie.actors.length - 1] ? ", " : ""}
                </span>
              ))
            ) : (
              "No actors"
            )}
          </p>
          <p>
            <strong className="text-warning">Plot:</strong> {movie.plot}
          </p>
        </div>
        <div className="card-footer d-flex gap-2">
          <button
            onClick={handleEditMovieModalShow}
            className="btn btn-success btn-sm w-50"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-danger btn-sm w-50"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Removed getMovies, getActors, getProducers from props */}
      <EditMovieModal
        showEditMovieModal={showEditMovieModal}
        handleEditMovieModalClose={handleEditMovieModalClose}
        movie={movie}
        actors={actors}
        producers={producers}
      />
    </div>
  );
}

export default MovieCard;
