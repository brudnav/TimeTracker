import { useEffect, useRef } from "react";
import { Modal as BootstrapModal } from "bootstrap";
import { deleteLocaleStorageRecord } from "../utils/LocalStorage";

const DeleteModal = ({ show, record, onClose, setData }) => {
  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalInstance.current = new BootstrapModal(modalRef.current, {
        backdrop: "static",
        keyboard: true,
      });

      modalRef.current.addEventListener("hidden.bs.modal", () => {
        onClose();
      });
    }
  }, []);

  useEffect(() => {
    if (modalInstance.current) {
      show ? modalInstance.current.show() : modalInstance.current.hide();
    }
  }, [show]);

  const handleDelete = () => {
    const newRecords = deleteLocaleStorageRecord(record);
    setData(newRecords);
  };

  return (
    <div className="modal fade" ref={modalRef} tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Record</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <h3>Opravdu chceš smazat tento záznam</h3>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                handleDelete();
                onClose();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
