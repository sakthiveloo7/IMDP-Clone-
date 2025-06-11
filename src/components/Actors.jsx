import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActorsAsync } from "../slice/actorSlice";
import CreateActorModal from "./modals/CreateActorModal";
import ActorTable from "./tables/ActorTable";
import { useNavigate } from "react-router-dom";
import EditActorModal from "./modals/EditActorModal";

function Actors() {
  const dispatch = useDispatch();
  const { actors, loading, error } = useSelector((state) => state.actor);
  const [showCreateActorModal, setShowCreateActorModal] = useState(false);

  const [showEditActorModal, setShowEditActorModal] = useState(false);
  const [selectedActor, setSelectedActor] = useState(null);

  const navigate = useNavigate();

  const handleEditClick = (actor) => {
    setSelectedActor(actor);
    setShowEditActorModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditActorModal(false);
    setSelectedActor(null);
  };

  const getActors = () => dispatch(getActorsAsync());

  useEffect(() => {
    getActors();
  }, [dispatch]);

  return (
    <div className="mt-5 container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-uppercase">Actors List</h2>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateActorModal(true)}
          >
            Add Actor
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
            Back
          </button>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          Loading...
        </div>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : actors.length === 0 ? (
        <p className="text-center text-danger fs-4">There is no Actor to display</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>S.NO</th>
                <th>NAME</th>
                <th>DOB</th>
                <th>GENDER</th>
                <th>BIO</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {actors.map((actor, index) => (
                <ActorTable
                  key={actor._id}
                  actor={actor}
                  index={index}
                  getActors={getActors}
                  onEditClick={handleEditClick}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Actor Modal */}
      <CreateActorModal
        show={showCreateActorModal}
        onClose={() => setShowCreateActorModal(false)}
        onSuccess={getActors}
      />

      {/* Edit Actor Modal placed OUTSIDE the table */}
      {showEditActorModal && selectedActor && (
        <EditActorModal
          showEditActorModal={showEditActorModal}
          handleEditActorModalClose={handleCloseEditModal}
          actor={selectedActor}
          getActors={getActors}
        />
      )}
    </div>
  );
}

export default Actors;

