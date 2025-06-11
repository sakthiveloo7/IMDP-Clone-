import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteActorAsync } from "../../slice/actorSlice";
import { toast } from "react-toastify";

function ActorTable({ actor, index, getActors, onEditClick }) {
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);

  const handleDeleteActor = (id) => {
    setDisable(true);
    dispatch(deleteActorAsync(id))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          toast.success("Actor deleted successfully");
          getActors();
        } else {
          toast.error("Failed to delete actor");
        }
      })
      .finally(() => setDisable(false));
  };

  return (
    <tr>
      <td className="text-center">{index + 1}</td>
      <td>{actor.name}</td>
      <td className="text-center">{actor.dob}</td>
      <td className="text-center">{actor.gender}</td>
      <td>{actor.bio}</td>
      <td className="text-center">
        <button
          onClick={() => onEditClick(actor)}
          className="btn btn-sm btn-success"
        >
          Edit
        </button>
      </td>
      <td className="text-center">
        {disable ? (
          <button disabled className="btn btn-sm btn-danger">
            Delete
          </button>
        ) : (
          <button
            onClick={() => handleDeleteActor(actor._id)}
            className="btn btn-sm btn-danger"
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
}

export default ActorTable;
