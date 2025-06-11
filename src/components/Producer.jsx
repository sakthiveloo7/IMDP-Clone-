import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducersAsync,
  selectAllProducers,
  selectProducerLoading,
  selectProducerError,
} from "../slice/producerSlice";
import ProducerTable from "./tables/ProducerTable";
import CreateProducerModal from "./modals/CreateProducerModal";
import EditProducerModal from "./modals/EditProducerModal";
import { useNavigate } from "react-router-dom";

function Producers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const producers = useSelector(selectAllProducers);
  const loading = useSelector(selectProducerLoading);
  const error = useSelector(selectProducerError);

  const [selectedProducer, setSelectedProducer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    dispatch(getProducersAsync());
  }, [dispatch]);

  const handleEdit = (producer) => {
    setSelectedProducer(producer);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedProducer(null);
    setShowEditModal(false);
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <div className="mb-4 w-100 d-flex justify-content-between align-items-center">
        <h2 className="text-uppercase">Producers List</h2>
        <div className="d-flex gap-3">
          <button className="btn btn-primary" onClick={openCreateModal}>
            Add Producer
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
            Back
          </button>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center">Loading....</div>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : producers.length === 0 ? (
        <p className="text-danger text-center fs-4">
          There are no Producers to display.
        </p>
      ) : (
        <div className="table-responsive mb-5 w-100">
          <table className="table table-bordered table-hover">
            <thead className="table-dark text-center">
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
              {producers.map((producer, index) => (
                <ProducerTable
                  key={producer._id}
                  producer={producer}
                  index={index}
                  onEdit={handleEdit}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showCreateModal && (
        <CreateProducerModal handleClose={closeCreateModal} refreshList={() => dispatch(getProducersAsync())} />
      )}

      {selectedProducer && (
        <EditProducerModal
          producer={selectedProducer}
          showEditProducerModal={showEditModal}
          handleEditProducerModalClose={closeEditModal}
        />
      )}
    </div>
  );
}

export default Producers;


