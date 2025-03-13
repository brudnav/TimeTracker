import { useState } from "react";
import { TimeRecord } from "../../../utils/LocalStorage";

export interface FilterTimeRecords {
  description: string;
  project: string;
  startTime: string;
  endTime: string;
}

const useTimeRecordsFilter = () => {
  const [filter, setFilter] = useState<FilterTimeRecords>({
    description: "",
    project: "",
    startTime: "",
    endTime: "",
  });

  const rulesFilter = (record: TimeRecord, filter: TimeRecord) => {
    const description = record.description.includes(filter.description || "");
    const project = record.project.includes(filter.project || "");

    const startTime = filter.startTime
      ? +new Date(filter.startTime) < +new Date(record.startTime)
      : true;

    const endTime = filter.endTime
      ? +new Date(filter.endTime) < +new Date(record.endTime)
      : true;

    console.log("filter.endTime", filter.endTime);
    console.log("+new Date(filter.endTime)", +new Date(filter.endTime));
    console.log("+new Date(record.endTime)", +new Date(record.endTime));
    console.log(endTime);

    return description && project && startTime && endTime;
  };

  return {
    rulesFilter,
    filter,
    setFilter,
  };
};

export default useTimeRecordsFilter;
