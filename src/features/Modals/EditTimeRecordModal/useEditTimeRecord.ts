import { useRef, useState } from "react";
import { TimeRecord } from "../../../utils/LocalStorage";

const useEditTimeRecord = () => {
  const modalRef = useRef(null);
  const modalInstance = useRef<BootstrapModal | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<TimeRecord | null>(null);

  return {
    modalRef,
    modalInstance,
    formRef,
    formData,
    setFormData,
  };
};

export default useEditTimeRecord;
