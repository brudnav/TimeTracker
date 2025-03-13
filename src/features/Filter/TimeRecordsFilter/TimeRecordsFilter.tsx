import { useEffect } from "react";
import { TimeRecord } from "../../../utils/LocalStorage";
import useTimeRecordsFilter from "./useTimeRecordsFilter";

interface FilterProps {
  records: TimeRecord[];
  setFilteredRecords: (newFilteredRecordsr: TimeRecord[] | []) => void;
}

const TimeRecordsFilter: React.FC<FilterProps> = ({
  records,
  setFilteredRecords,
}) => {
  const { rulesFilter, filter, setFilter } = useTimeRecordsFilter();

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

export default TimeRecordsFilter;
