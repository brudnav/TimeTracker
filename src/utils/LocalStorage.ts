enum StorageKeys {
  RECORD = "record",
}

export interface TimeRecord {
  id: string;
  project: string;
  description: string;
  duration: number;
  startTime: string;
  endTime: string;
}

export const getLocaleStorageRecords = () => {
  const records = localStorage.getItem(StorageKeys.RECORD)
    ? JSON.parse(localStorage.getItem(StorageKeys.RECORD)!)
    : [];
  return records;
};

export const setLocaleStorageRecords = (record: TimeRecord) => {
  const records = getLocaleStorageRecords();
  const newRecords = [...records, record];
  const recordStringify = JSON.stringify(newRecords);
  localStorage.setItem(StorageKeys.RECORD, recordStringify);
};
