import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editMovieAsync } from "../../slice/movieSlice";
import { getActorsAsync } from "../../slice/actorSlice";
import { getProducersAsync } from "../../slice/producerSlice";
import { fetchMoviesAsync } from "../../slice/movieSlice";
import { toast } from "react-toastify";

function EditMovieModal({
  showEditMovieModal,
  handleEditMovieModalClose,
  movie,
}) {
  const dispatch = useDispatch();

  const { actors, loading: actorsLoading } = useSelector((state) => state.actor);
  const { producers, loading: producersLoading } = useSelector((state) => state.producer);

  const [loadingButton, setLoadingButton] = useState(false);
  const [err, setErr] = useState("");
  const formRef = useRef(null);

  const [selectedActorIds, setSelectedActorIds] = useState([]);

  const handleCheckboxChange = (actorId) => {
    setSelectedActorIds((prev) =>
      prev.includes(actorId) ? prev.filter((id) => id !== actorId) : [...prev, actorId]
    );
  };

  const resetForm = () => {
    const selected = movie?.actors?.map((actor) => actor._id) || [];
    setSelectedActorIds(selected);
    setErr("");
    if (formRef.current) formRef.current.reset();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErr("");

    const formData = new FormData(event.target);
    const updatedMovie = {
      _id: movie._id,
      name: formData.get("name"),
      yearOfRelease: formData.get("yearOfRelease"),
      poster: formData.get("poster"),
      plot: formData.get("plot"),
      director: formData.get("director"),
      producer: formData.get("producer"),
      actors: selectedActorIds,
    };

    setLoadingButton(true);
    const response = await dispatch(editMovieAsync(updatedMovie));
    setLoadingButton(false);

    if (response.meta.requestStatus === "fulfilled") {
      // Fetch updated movie list after successful update
      dispatch(fetchMoviesAsync()); // Fetch movies after edit
      toast.success("Movie updated successfully!"); // Show success toast
      setTimeout(() => {
        handleEditMovieModalClose(); // Close modal after success toast
      }, 1000);
    } else {
      setErr(response.payload?.error || "Failed to update movie");
    }
  };

  useEffect(() => {
    if (!actors.length) dispatch(getActorsAsync());
    if (!producers.length) dispatch(getProducersAsync());
  }, [dispatch, actors.length, producers.length]);

  useEffect(() => {
    if (showEditMovieModal) resetForm();
  }, [showEditMovieModal, movie]);

  if (!movie || actorsLoading || producersLoading) return null;

  return (
    <>
      {/* Modal */}
      <div
        className={`modal fade ${showEditMovieModal ? "show" : ""}`}
        tabIndex="-1"
        style={{ display: showEditMovieModal ? "block" : "none" }}
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h3>EDIT MOVIE DATA</h3>
              <button
                type="button"
                className="btn-close"
                onClick={handleEditMovieModalClose}
              ></button>
            </div>

            <form onSubmit={handleSubmit} ref={formRef}>
              <div className="modal-body">
                {["name", "yearOfRelease", "poster", "plot", "director"].map((field) => (
                  <div className="mb-3" key={field}>
                    <label htmlFor={field} className="form-label">
                      {field[0].toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type="text"
                      id={field}
                      name={field}
                      className="form-control"
                      defaultValue={movie[field]}
                      required
                    />
                  </div>
                ))}

                <div className="mb-3">
                  <label htmlFor="producer" className="form-label">
                    Producer
                  </label>
                  <select
                    id="producer"
                    name="producer"
                    className="form-select"
                    defaultValue={movie.producer?._id}
                    required
                  >
                    {producers.map((producer) => (
                      <option key={producer._id} value={producer._id}>
                        {producer.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Actor Dropdown with Checkbox Selection */}
                <div className="mb-3">
                  <label className="form-label">Actors</label>
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-secondary dropdown-toggle"
                      type="button"
                      id="actorDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {selectedActorIds.length
                        ? `${selectedActorIds.length} Actor(s) selected`
                        : "Select Actors"}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="actorDropdown">
                      {actors.map((actor) => (
                        <li key={actor._id}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`actor-${actor._id}`}
                              value={actor._id}
                              checked={selectedActorIds.includes(actor._id)}
                              onChange={() => handleCheckboxChange(actor._id)}
                            />
                            <label className="form-check-label" htmlFor={`actor-${actor._id}`}>
                              {actor.name}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                {err && <div className="text-danger me-auto">{err}</div>}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loadingButton}
                >
                  {loadingButton ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleEditMovieModalClose}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditMovieModal;
