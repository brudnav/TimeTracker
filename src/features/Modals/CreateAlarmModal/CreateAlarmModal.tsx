import React, { useEffect } from "react";
import { Modal as BootstrapModal } from "bootstrap";
import { AlarmData } from "../../../utils/LocalStorage";
import CreateAlarmForm from "./CreateAlarmForm";
import useCreateAlarm from "./useCreateAlarm";
import { ModalProps } from "../../../types/Modal/modal";
import { timeToSeconds } from "../../../utils/Time";

const CreateAlarmModal: React.FC<ModalProps<AlarmData>> = ({
  show,
  onClose,
  setData,
}) => {
  const { formData, formRef, modalInstance, modalRef, setFormData } =
    useCreateAlarm();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (!prev) return null;

      // Funkce pro rekurzivní nastavení hodnoty v objektu podle cesty (path)
      const setDeepValue = (obj: any, path: string[], value: any): any => {
        if (path.length === 1) {
          return { ...obj, [path[0]]: value };
        }

        const [key, ...rest] = path;
        return {
          ...obj,
          [key]: setDeepValue(obj[key] || {}, rest, value), // Rekurzivně nastavíme hodnotu v objektu
        };
      };

      // Rozdělení `name` podle teček → získáme pole ["project", "title"]
      const path = name.split(".");

      return setDeepValue(prev, path, value);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      console.log(formData);

      setData({
        isAlarmSet: formData.alarmTime ? true : false,
        alarmTime: formData.alarmTime,
      });
      onClose();
    }
  };

  return (
    <div className="modal fade" ref={modalRef} tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Alarm</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <CreateAlarmForm
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
              Set Alarm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAlarmModal;
