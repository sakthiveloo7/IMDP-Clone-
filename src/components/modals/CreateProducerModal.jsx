import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProducerAsync } from "../../slice/producerSlice";
import { toast } from "react-toastify";

function CreateProducerModal({ handleClose, refreshList }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.producer);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    bio: "",
    professionalType: "Producer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, gender, dob, bio } = formData;

    if (!name || !gender || !dob || !bio) {
      toast.error("All fields are required!");
      return;
    }

    const result = await dispatch(createProducerAsync(formData));
    if (createProducerAsync.fulfilled.match(result)) {
      toast.success("Producer created successfully");

      setFormData({
        name: "",
        gender: "",
        dob: "",
        bio: "",
        professionalType: "Producer",
      });

      handleClose();            // Close modal
      refreshList();            // Refresh the producer list
    } else {
      toast.error("Failed to create producer");
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Create New Producer</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
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
              {error && <p className="text-danger">{error}</p>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
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

export default CreateProducerModal;

