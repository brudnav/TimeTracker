import React from "react";

export type EditProjectFormData = {
  title: string;
  color: string;
};

interface EditProjectFormProps {
  formData: EditProjectFormData | null;
  handleSubmit: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formRef: React.RefObject<HTMLFormElement | null>;
}

const EditTimeRecordForm: React.FC<EditProjectFormProps> = ({
  handleSubmit,
  formData,
  handleInputChange,
  formRef,
}) => {
  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label className="form-label">Color</label>
        <input
          type="color"
          className="form-control"
          name="description"
          value={formData?.color || ""}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Project Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={formData?.title || ""}
          onChange={handleInputChange}
          required
        />
      </div>
    </form>
  );
};

export default EditTimeRecordForm;
