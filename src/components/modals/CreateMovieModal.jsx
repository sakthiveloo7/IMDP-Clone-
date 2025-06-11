import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createMovieAsync } from "../../slice/movieSlice";
import { toast } from "react-toastify";

function CreateMovieModal({ show, onClose, actors, producers }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    yearOfRelease: "",
    director: "",
    plot: "",
    poster: "",
    actorIds: [],
    producerId: "",
  });

  const [loading, setLoading] = useState(false);
  const [showActorDropdown, setShowActorDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "actorIds") {
      const actorId = value;
      const isSelected = formData.actorIds.includes(actorId);
      const updatedActorIds = isSelected
        ? formData.actorIds.filter((id) => id !== actorId)
        : [...formData.actorIds, actorId];

      setFormData({ ...formData, actorIds: updatedActorIds });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      yearOfRelease: formData.yearOfRelease,
      director: formData.director,
      plot: formData.plot,
      poster: formData.poster,
      producer: formData.producerId,
      actors: formData.actorIds,
    };

    const result = await dispatch(createMovieAsync(payload));
    setLoading(false);

    if (createMovieAsync.fulfilled.match(result)) {
      toast.success("Movie created successfully");
      setFormData({
        name: "",
        yearOfRelease: "",
        director: "",
        plot: "",
        poster: "",
        actorIds: [],
        producerId: "",
      });
      onClose();
    } else {
      toast.error("Failed to create movie");
    }
  };

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Add Movie</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Movie Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Year of Release</label>
                <input
                  type="number"
                  name="yearOfRelease"
                  className="form-control"
                  value={formData.yearOfRelease}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Director</label>
                <input
                  type="text"
                  name="director"
                  className="form-control"
                  value={formData.director}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Plot</label>
                <textarea
                  name="plot"
                  className="form-control"
                  rows="3"
                  value={formData.plot}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Poster URL</label>
                <input
                  type="url"
                  name="poster"
                  className="form-control"
                  value={formData.poster}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Actor selection dropdown with checkboxes */}
              <div className="mb-3 position-relative">
                <label className="form-label d-block">Select Actors</label>
                <button
                  type="button"
                  className="btn btn-outline-secondary dropdown-toggle w-100 text-start"
                  onClick={() => setShowActorDropdown((prev) => !prev)}
                >
                  {formData.actorIds.length > 0
                    ? `${formData.actorIds.length} actor(s) selected`
                    : "Choose actors"}
                </button>
                {showActorDropdown && (
                  <div
                    className="border rounded mt-1 p-2 position-absolute bg-white w-100"
                    style={{ zIndex: 1050, maxHeight: "200px", overflowY: "auto" }}
                  >
                    {actors.map((actor) => (
                      <div className="form-check" key={actor._id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="actorIds"
                          value={actor._id}
                          id={`actor-${actor._id}`}
                          checked={formData.actorIds.includes(actor._id)}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor={`actor-${actor._id}`}>
                          {actor.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Select Producer</label>
                <select
                  name="producerId"
                  className="form-select"
                  value={formData.producerId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose a producer</option>
                  {producers.map((producer) => (
                    <option key={producer._id} value={producer._id}>
                      {producer.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateMovieModal;
