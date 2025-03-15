enum StorageKeys {
  Record = "RECORD",
  ProjectData = "PROJECT_DATA",
}

export interface TimeRecord {
  id: string;
  project: ProjectData;
  description: string;
  duration: number;
  startTime: string;
  endTime: string;
}

export interface ProjectData {
  id: string;
  title: string;
  color: string;
}

export interface AlarmData {
  alarmTime: string;
}

//TimeRecords

export const getLocaleStorageRecords = (): TimeRecord[] | [] => {
  const records = localStorage.getItem(StorageKeys.Record)
    ? JSON.parse(localStorage.getItem(StorageKeys.Record)!)
    : [];
  return records;
};

export const setLocaleStorageRecords = (record: TimeRecord): TimeRecord[] => {
  const records = getLocaleStorageRecords();
  const newRecords = [...records, record];
  const recordStringify = JSON.stringify(newRecords);
  localStorage.setItem(StorageKeys.Record, recordStringify);

  return newRecords;
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

//Projects

export const getLocaleStorageProjects = (): ProjectData[] | [] => {
  const projects = localStorage.getItem(StorageKeys.ProjectData)
    ? JSON.parse(localStorage.getItem(StorageKeys.ProjectData)!)
    : [];
  return projects;
};

export const setLocaleStorageProjects = (
  project: ProjectData
): ProjectData[] => {
  const projects = getLocaleStorageProjects();
  const newProjects = [...projects, project];
  const projectStringify = JSON.stringify(newProjects);
  localStorage.setItem(StorageKeys.ProjectData, projectStringify);

  return newProjects;
};

export const updateLocaleStorageProjects = (
  newProject: ProjectData
): ProjectData[] => {
  const projects = getLocaleStorageProjects();

  const updatedProjects = projects.map((project) => {
    if (project.id === newProject.id) {
      return { ...project, ...newProject };
    }
    return project;
  });

  const recordStringify = JSON.stringify(updatedProjects);
  localStorage.setItem(StorageKeys.ProjectData, recordStringify);

  return updatedProjects;
};

export const deleteLocaleStorageProject = (
  newProject: ProjectData
): ProjectData[] => {
  const projects = getLocaleStorageProjects();

  const updatedProjects = projects.filter(
    (project) => project.id !== newProject.id
  );

  const projectStringify = JSON.stringify(updatedProjects);
  localStorage.setItem(StorageKeys.ProjectData, projectStringify);

  return updatedProjects;
};
