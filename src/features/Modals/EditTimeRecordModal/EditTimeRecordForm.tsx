import React from "react";

export type EditTimeRecordFormData = {
  description: string;
  project: string;
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
          step={1}
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
          step={1}
          name="endTime"
          value={formData?.endTime || ""}
          onChange={handleInputChange}
          required
        />
      </div>
    </form>
  );
};

export default EditTimeRecordForm;
