import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteProducerAsync } from "../../slice/producerSlice";

function ProducerTable({ producer, index, onEdit }) {
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);

  const handleDeleteProducer = (id) => {
    setDisable(true);
    dispatch(deleteProducerAsync(id))
      .then(() => {
        toast.success("Producer deleted successfully");
      })
      .catch((err) => {
        toast.error(err.message);
        setDisable(false);
      });
  };

  return (
    <tr>
      <td className="text-center">{index + 1}</td>
      <td>{producer.name}</td>
      <td className="text-center">{producer.dob}</td>
      <td className="text-center">{producer.gender}</td>
      <td>{producer.bio}</td>
      <td className="text-center">
        <button
          className="btn btn-sm btn-success"
          onClick={() => onEdit(producer)}
        >
          Edit
        </button>
      </td>
      <td className="text-center">
        <button
          className="btn btn-sm btn-danger"
          onClick={() => handleDeleteProducer(producer._id)}
          disabled={disable}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ProducerTable;
