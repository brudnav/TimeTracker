import { useState } from "react";
import MyVirtualizedList from "../components/VirtualizedList";
import { useTimeRecordContext } from "../contexts/TimeRecordContext";
import Filter from "../features/Filter/Filter";
const ProjectsPage = () => {
  const { records, setRecords } = useTimeRecordContext();
  const [filteredRecords, setFilteredRecords] = useState(records);
  return (
    <>
      <h4>Projekty</h4>
      <Filter records={records} setFilteredRecords={setFilteredRecords} />
      <MyVirtualizedList data={filteredRecords} setData={setRecords} />
    </>
  );
};

export default ProjectsPage;
