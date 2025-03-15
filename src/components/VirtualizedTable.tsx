import { FixedSizeList as List } from "react-window";
import "./VirtualizedTable.scss";
import EditTimeRecordModal from "../features/Modals/EditTimeRecordModal/EditTimeRecordModal.tsx";
import { useState } from "react";
import { TimeRecord } from "../utils/LocalStorage.ts";
import DeleteTimeRecordModal from "./DeleteModal.tsx";
import { setMissingValue } from "../utils/TextFormat.ts";
import { getLocalStringFormat } from "../utils/Time.ts";

interface VirtualizedTableProps {
  data: TimeRecord[];
  setData: (record: TimeRecord) => void;
}

const VirtualizedTable: React.FC<VirtualizedTableProps> = ({
  data,
  setData,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState<TimeRecord | null>(null);

  const handleEditClick = (record: TimeRecord) => {
    setSelectedRecord(record);
    setShowEditModal(true);
  };

  const handleDeleteClick = (record: TimeRecord) => {
    setSelectedRecord(record);
    setShowDeleteModal(true);
  };

  type Row = {
    index: number;
    style: React.CSSProperties;
  };

  const Row = ({ index, style }: Row) => {
    const record = data[index];
    return (
      <div style={style} className="tr">
        <div className="td col-id">{index + 1}</div>
        <div className="td col-description">
          {setMissingValue(record.description)}
        </div>
        <div className="td col-project gap-2">
          {record.project.color && (
            <span
              className="tag"
              style={{ backgroundColor: record.project.color }}
            ></span>
          )}
          <p>{setMissingValue(record.project.title)}</p>
        </div>
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
            ✍️
          </button>
          <button
            onClick={() => {
              handleDeleteClick(record);
            }}
          >
            ❌
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
        <List height={400} itemCount={data.length} itemSize={50} width={1000}>
          {Row}
        </List>
      </div>
      <EditTimeRecordModal
        data={selectedRecord}
        setData={setData}
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
      <DeleteTimeRecordModal
        data={selectedRecord}
        show={showDeleteModal}
        setData={setData}
        onClose={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default VirtualizedTable;
