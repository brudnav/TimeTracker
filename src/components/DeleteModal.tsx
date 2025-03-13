import { useEffect } from "react";
import { Modal as BootstrapModal } from "bootstrap";
import { deleteLocaleStorageRecord, TimeRecord } from "../utils/LocalStorage";
import { ModalProps } from "../types/Modal/modal";
import useEditTimeRecord from "../features/Modals/EditTimeRecordModal/useEditTimeRecord";

const DeleteTimeRecordModal: React.FC<ModalProps<TimeRecord>> = ({
  show,
  data: record,
  onClose,
  setData,
}) => {
  const { modalInstance, modalRef } = useEditTimeRecord();

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
      if (show) {
        modalInstance.current.show();
      } else {
        modalInstance.current.hide();
      }
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
            <h5 className="modal-title">Delete Record</h5>
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

export default DeleteTimeRecordModal;
