import { useState } from "react";
import MyVirtualizedList from "../components/VirtualizedList";
import { getLocaleStorageRecords } from "../utils/LocalStorage";
const ProjectsPage = () => {
  const [records, setRecords] = useState(getLocaleStorageRecords());

  return (
    <>
      <h4>Projekty</h4>
      <MyVirtualizedList data={records} setData={setRecords} />
    </>
  );
};

export default ProjectsPage;
