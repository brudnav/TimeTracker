import { useEffect, useState } from "react";
import { TimeRecord } from "../../utils/LocalStorage";

interface FilterProps {
  records: TimeRecord[];
  setFilteredRecords: (newFilteredRecordsr: TimeRecord[] | []) => void;
}

interface FilterTimeRecords {
  description: string;
  project: string;
  startTime: string;
  endTime: string;
}

const rulesFilter = (record: TimeRecord, filter: TimeRecord) => {
  const description = record.description.includes(filter.description || "");
  const project = record.project.includes(filter.project || "");

  const startTime = filter.startTime
    ? +new Date(filter.startTime) < +new Date(record.startTime)
    : true;

  const endTime = filter.endTime
    ? +new Date(filter.endTime) > +new Date(record.endTime)
    : true;

  return description && project && startTime && endTime;
};

const Filter: React.FC<FilterProps> = ({ records, setFilteredRecords }) => {
  const [filter, setFilter] = useState<FilterTimeRecords>({
    description: "",
    project: "",
    startTime: "",
    endTime: "",
  });

  const filterRecords = (filter: TimeRecord) => {
    const newFilteredRecords = records.filter((record) =>
      rulesFilter(record, filter)
    );
    setFilteredRecords(newFilteredRecords);
  };

  useEffect(() => {
    filterRecords(filter);
  }, [filter, records]);

  const clearFilter = () => {
    setFilter({
      description: "",
      project: "",
      startTime: "",
      endTime: "",
    });
  };

  const filterHandler = (name: string, value: string | number | object) => {
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(filter);

  return (
    <div className="card container border-0 shadow-lg">
      <div className="card-body hstack justify-content-center gap-3">
        <input
          style={{ width: "150px" }}
          type="text"
          name="description"
          value={filter?.description || ""}
          placeholder="Description"
          className="form-control"
          onChange={(e) => {
            filterHandler(e.target.name, e.target.value);
          }}
        />
        <input
          style={{ width: "150px" }}
          type="text"
          name="project"
          value={filter?.project || ""}
          placeholder="Project"
          className="form-control"
          onChange={(e) => {
            filterHandler(e.target.name, e.target.value);
          }}
        />
        <input
          name="startTime"
          type="datetime-local"
          step={1}
          value={filter?.startTime || ""}
          className="form-control m-0"
          onChange={({ target }) => {
            filterHandler(target.name, target.value);
          }}
        />
        <span>➡️</span>
        <input
          name="endTime"
          type="datetime-local"
          step={1}
          value={filter?.endTime || ""}
          className="form-control m-0"
          onChange={({ target }) => {
            filterHandler(target.name, target.value);
          }}
        />
        <button
          onClick={() => {
            clearFilter();
          }}
          className="btn btn-primary"
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
