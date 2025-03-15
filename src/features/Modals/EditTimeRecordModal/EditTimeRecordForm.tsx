import React from "react";
import { ProjectData } from "../../../utils/LocalStorage";

export type EditTimeRecordFormData = {
  description: string;
  project: ProjectData;
  startTime: string;
  endTime: string;
};

interface EditTimeRecordFormProps {
  formData: EditTimeRecordFormData | null;
  handleSubmit: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formRef: React.RefObject<HTMLFormElement | null>;
}

const EditTimeRecordForm: React.FC<EditTimeRecordFormProps> = ({
  handleSubmit,
  formData,
  handleInputChange,
  formRef,
}) => {
  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          name="description"
          value={formData?.description || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Project</label>
        <input
          type="text"
          className="form-control"
          name="project.title"
          value={formData?.project.title || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Project Color</label>
        <input
          type="color"
          className="form-control form-control-color"
          name="project.color"
          value={formData?.project.color || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Start Time</label>
        <input
          type="datetime-local"
          className="form-control"
          step={1}
          name="startTime"
          value={formData?.startTime || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">End Time</label>
        <input
          type="datetime-local"
          className="form-control"
          step={1}
          name="endTime"
          value={formData?.endTime || ""}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
};

export default EditTimeRecordForm;
