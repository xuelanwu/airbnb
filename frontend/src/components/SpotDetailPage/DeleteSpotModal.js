import { useState } from "react";
import { Modal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeletespot } from "../../store/spot";
import { useHistory, useParams } from "react-router-dom";

const DeleteSpotModal = () => {
  const [showModal, setShowModal] = useState(false);
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(fetchDeletespot(spotId))
      .then(() => setShowModal(false))
      .then(() => history.push("/"));
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="delete-modal-block">
            <p>Are you sure you want to delete?</p>
          </div>
          <div>
            <div
              className="delete-modal-block delete-modal-buttons"
              onClick={handleCancel}
            >
              <button>Cancel</button>
            </div>
            <div
              className="delete-modal-block delete-modal-buttons"
              onClick={handleDelete}
            >
              <button>Delete</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DeleteSpotModal;
