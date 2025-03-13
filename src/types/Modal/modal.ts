export interface ModalProps<T> {
  show: boolean;
  onClose: () => void;
  data: T | null;
  setData: (updatedRecord: T[]) => void;
}
