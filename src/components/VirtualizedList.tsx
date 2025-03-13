import { FixedSizeList as List } from "react-window";
import "./VirtualizedList.scss"; // Naše vlastní styly
import EditModal from "./EditModal.tsx";
import { useState } from "react";
import { TimeRecord } from "../utils/LocalStorage";
import DeleteModal from "./DeleteModal.tsx";
import { setMissingValue } from "../utils/TextFormat.ts";
import { getLocalStringFormat } from "../utils/Time.ts";

export default function VirtualizedTable({ data, setData }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  console.log("data", data);

  const [selectedRecord, setSelectedRecord] = useState<TimeRecord | null>(null);

  const handleEditClick = (record: TimeRecord) => {
    setSelectedRecord(record);
    setShowEditModal(true);
  };

  const handleDeleteClick = (record: TimeRecord) => {
    setSelectedRecord(record);
    setShowDeleteModal(true);
  };

  const Row = ({ index, style }) => {
    const record = data[index];
    return (
      <div style={style} className="tr">
        <div className="td col-id">{index + 1}</div>
        <div className="td col-description">
          {setMissingValue(record.description)}
        </div>
        <div className="td col-project">{setMissingValue(record.project)}</div>
        <div className="td col-time">
          {setMissingValue(getLocalStringFormat(record.startTime))}
        </div>
        <div className="td col-time">
          {setMissingValue(getLocalStringFormat(record.endTime))}
        </div>
        <div className="td col-actions">
          <button
            onClick={() => {
              handleEditClick(record);
            }}
          >
            ⚡
          </button>
          <button
            onClick={() => {
              handleDeleteClick(record);
            }}
          >
            ❤️
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <div className="thead">
          <div className="tr">
            <div className="th col-id">#</div>
            <div className="th col-description">Description</div>
            <div className="th col-project">Project</div>
            <div className="th col-time">Start Time</div>
            <div className="th col-time">End Time</div>
            <div className="th col-actions"></div>
          </div>
        </div>
        <List
          height={400} // Výška tabulky
          itemCount={data.length} // Počet řádků
          itemSize={50} // Výška každého řádku
          width={1000} // Pevná šířka pro scrollování
        >
          {Row}
        </List>
      </div>
      <EditModal
        record={selectedRecord}
        setData={setData}
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
      <DeleteModal
        record={selectedRecord}
        show={showDeleteModal}
        setData={setData}
        onClose={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
