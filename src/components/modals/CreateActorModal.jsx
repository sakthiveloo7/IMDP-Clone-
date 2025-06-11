import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActorAsync, resetError } from "../../slice/actorSlice";
import { toast } from "react-toastify";

function CreateActorModal({ show, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    bio: "",
    professionalType: "Actor",
  });

  const { loading, error } = useSelector((state) => state.actor);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.gender || !formData.dob || !formData.bio) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const result = await dispatch(createActorAsync(formData)).unwrap();
      toast.success("Actor created successfully");
      onClose();
      onSuccess(); // refetch actors
      setFormData({
        name: "",
        gender: "",
        dob: "",
        bio: "",
        professionalType: "Actor",
      });
    } catch (err) {
      toast.error("Failed to create actor");
      dispatch(resetError());
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Create New Actor</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Bio</label>
                <textarea
                  className="form-control"
                  name="bio"
                  rows="3"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              {error && <div className="text-danger">{error}</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateActorModal;
