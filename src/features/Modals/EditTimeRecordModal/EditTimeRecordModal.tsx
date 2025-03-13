import React, { useEffect } from "react";
import { Modal as BootstrapModal } from "bootstrap";
import {
  TimeRecord,
  updateLocaleStorageRecords,
} from "../../../utils/LocalStorage";
import EditTimeRecordForm from "./EditTimeRecordForm";
import useEditTimeRecord from "./useEditTimeRecord";
import { ModalProps } from "../../../types/Modal/modal";

const EditTimeRecordModal: React.FC<ModalProps<TimeRecord>> = ({
  show,
  onClose,
  data: record,
  setData: setRecords,
}) => {
  const { formData, formRef, modalInstance, modalRef, setFormData } =
    useEditTimeRecord();

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

    if (show && record) {
      setFormData(record);
    }
  }, [show, record]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) =>
      prev ? { ...prev, [e.target.name]: e.target.value } : null
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      console.log(formData);
      const newRecords = updateLocaleStorageRecords(formData);
      setRecords(newRecords);
      onClose();
    }
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
            <EditTimeRecordForm
              formRef={formRef}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button
              className="btn btn-success"
              onClick={() => formRef.current?.requestSubmit()}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTimeRecordModal;
