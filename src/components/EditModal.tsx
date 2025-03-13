import React, { useEffect, useRef, useState } from "react";
import { Modal as BootstrapModal } from "bootstrap";
import { TimeRecord, updateLocaleStorageRecords } from "../utils/LocalStorage";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  record: TimeRecord | null;
  onSave: (updatedRecord: TimeRecord) => void;
}

const EditModal: React.FC<ModalProps> = ({
  show,
  onClose,
  record,
  onSave,
  setData,
}) => {
  const modalRef = useRef(null);
  const modalInstance = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<TimeRecord | null>(null);

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

    if (show && record) {
      setFormData(record); // Při otevření nastavíme data
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
      setData(newRecords);
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
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={formData?.description || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Project</label>
                <input
                  type="text"
                  className="form-control"
                  name="project"
                  value={formData?.project || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Start Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="startTime"
                  value={formData?.startTime || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">End Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="endTime"
                  value={formData?.endTime || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button
              className="btn btn-primary"
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

export default EditModal;
