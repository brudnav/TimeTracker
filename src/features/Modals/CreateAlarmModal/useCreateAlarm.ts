import { useRef, useState } from "react";
import { AlarmData } from "../../../utils/LocalStorage";

const useEditTimeRecord = () => {
  const modalRef = useRef(null);
  const modalInstance = useRef<BootstrapModal | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<AlarmData | null>({
    alarmTime: "02:00:00",
  });

  return {
    modalRef,
    modalInstance,
    formRef,
    formData,
    setFormData,
  };
};

export default useEditTimeRecord;
