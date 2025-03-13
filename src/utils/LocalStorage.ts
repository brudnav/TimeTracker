enum StorageKeys {
  Record = "RECORD",
}

export interface TimeRecord {
  id: string;
  project: string;
  description: string;
  duration: number;
  startTime: string;
  endTime: string;
}

export const getLocaleStorageRecords = (): TimeRecord[] | [] => {
  const records = localStorage.getItem(StorageKeys.Record)
    ? JSON.parse(localStorage.getItem(StorageKeys.Record)!)
    : [];
  return records;
};

export const setLocaleStorageRecords = (record: TimeRecord) => {
  const records = getLocaleStorageRecords();
  const newRecords = [...records, record];
  const recordStringify = JSON.stringify(newRecords);
  localStorage.setItem(StorageKeys.Record, recordStringify);
};

export const updateLocaleStorageRecords = (
  newRecord: TimeRecord
): TimeRecord[] => {
  const records = getLocaleStorageRecords();

  const updatedRecords = records.map((record) => {
    if (record.id === newRecord.id) {
      return { ...record, ...newRecord };
    }
    return record;
  });

  const recordStringify = JSON.stringify(updatedRecords);
  localStorage.setItem(StorageKeys.Record, recordStringify);

  return updatedRecords;
};

export const deleteLocaleStorageRecord = (
  newRecord: TimeRecord
): TimeRecord[] => {
  const records = getLocaleStorageRecords();

  const updatedRecords = records.filter((record) => record.id !== newRecord.id);

  const recordStringify = JSON.stringify(updatedRecords);
  localStorage.setItem(StorageKeys.Record, recordStringify);

  return updatedRecords;
};
