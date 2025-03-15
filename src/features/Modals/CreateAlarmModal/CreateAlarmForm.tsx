import React from "react";

export type CreateAlarmFormData = {
  alarmTime: string;
};

interface CreateAlarmFormProps {
  formData: CreateAlarmFormData | null;
  handleSubmit: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formRef: React.RefObject<HTMLFormElement | null>;
}

const CreateAlarmForm: React.FC<CreateAlarmFormProps> = ({
  handleSubmit,
  formData,
  handleInputChange,
  formRef,
}) => {
  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label className="form-label">Alarm Time</label>
        <input
          type="time"
          step={1}
          className="form-control"
          name="alarmTime"
          value={formData?.alarmTime}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
};

export default CreateAlarmForm;
