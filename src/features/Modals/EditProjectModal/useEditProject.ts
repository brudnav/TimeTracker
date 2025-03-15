import { useRef, useState } from "react";
import { ProjectData } from "../../../utils/LocalStorage";

const useEditProject = () => {
  const modalRef = useRef(null);
  const modalInstance = useRef<BootstrapModal | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<ProjectData | null>(null);

  return {
    modalRef,
    modalInstance,
    formRef,
    formData,
    setFormData,
  };
};

export default useEditProject;
