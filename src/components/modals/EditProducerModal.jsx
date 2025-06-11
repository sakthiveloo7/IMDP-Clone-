import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editProducerAsync } from "../../slice/producerSlice";
import { toast } from "react-toastify";

const convertToInputDateFormat = (dateStr) => {
  const [day, month, year] = dateStr.split("-");
  return `${year}-${month}-${day}`;
};

function EditProducerModal({ showEditProducerModal, handleEditProducerModalClose, producer }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    bio: "",
  });

  useEffect(() => {
    if (producer) {
      setFormData({
        name: producer.name,
        gender: producer.gender,
        dob: convertToInputDateFormat(producer.dob),
      });
    }
  }, [producer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await dispatch(editProducerAsync({ id: producer._id, ...formData }));
    setLoading(false);

    if (editProducerAsync.fulfilled.match(result)) {
      toast.success("Producer updated successfully");
      handleEditProducerModalClose();
    } else {
      toast.error("Failed to update producer");
    }
  };

  return (
    <div
      className={`modal fade ${showEditProducerModal ? "show d-block" : ""}`}
      tabIndex="-1"
      aria-labelledby="editProducerModalLabel"
      aria-hidden={!showEditProducerModal}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title" id="editProducerModalLabel">Edit Producer</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleEditProducerModalClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dob" className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select
                  name="gender"
                  id="gender"
                  className="form-select"
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
                <label htmlFor="bio" className="form-label">Bio</label>
                <textarea
                  name="bio"
                  id="bio"
                  className="form-control"
                  rows="3"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleEditProducerModalClose}
              >
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

export default EditProducerModal;

