import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editActorAsync, resetError } from "../../slice/actorSlice";
import { toast } from "react-toastify";

const convertToInputDateFormat = (dateStr) => {
  if (!dateStr) return "";
  if (dateStr.includes("-")) {
    const parts = dateStr.split("-");
    if (parts[0].length === 4) {
      return dateStr;
    }
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  return dateStr;
};

function EditActorModal({
  showEditActorModal,
  handleEditActorModalClose,
  actor,
  getActors,
}) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.actor);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    bio: "",
    professionalType: "Actor",
  });

  useEffect(() => {
    if (actor) {
      const formattedDOB = convertToInputDateFormat(actor.dob);
      setFormData({
        name: actor.name || "",
        gender: actor.gender || "",
        dob: formattedDOB,
        bio: actor.bio || "",
        professionalType: "Actor",
      });
    }
  }, [actor]);

  useEffect(() => {
    if (!showEditActorModal) {
      dispatch(resetError());
      setFormData({
        name: "",
        gender: "",
        dob: "",
        bio: "",
        professionalType: "Actor",
      });
    }
  }, [showEditActorModal, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, gender, dob, bio } = formData;
    if (!name || !gender || !dob || !bio) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await dispatch(
        editActorAsync({ actorId: actor._id, actorData: formData })
      );

      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Actor updated successfully");
        await getActors();
        dispatch(resetError());
        handleEditActorModalClose();
      } else {
        toast.error("Failed to update actor");
      }
    } catch (err) {
      toast.error("An error occurred while updating actor.");
    }
  };

  return (
    <div
      className={`modal fade ${showEditActorModal ? "show d-block" : ""}`}
      tabIndex="-1"
      aria-labelledby="editActorModalLabel"
      aria-hidden={!showEditActorModal}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editActorModalLabel">Edit Actor Data</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                handleEditActorModalClose();
                dispatch(resetError());
              }}
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
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
              <div className="d-flex justify-content-between gap-3">
                <div className="mb-3 flex-grow-1">
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
                <div className="mb-3 flex-grow-1">
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
              {error && showEditActorModal && (
                <div className="text-danger">{error}</div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  handleEditActorModalClose();
                  dispatch(resetError());
                }}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Updating..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditActorModal;
