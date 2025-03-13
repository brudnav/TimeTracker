import { useState } from "react";
import MyVirtualizedList from "../components/VirtualizedList";
import { useTimeRecordContext } from "../contexts/TimeRecordContext";
import TimeRecordsFilter from "../features/Filter/TimeRecordsFilter/TimeRecordsFilter";
const ProjectsPage = () => {
  const { records, setRecords } = useTimeRecordContext();
  const [filteredRecords, setFilteredRecords] = useState(records);
  return (
    <>
      <h4>Projekty</h4>
      <TimeRecordsFilter
        records={records}
        setFilteredRecords={setFilteredRecords}
      />
      <MyVirtualizedList data={filteredRecords} setData={setRecords} />
    </>
  );
};

export default ProjectsPage;
