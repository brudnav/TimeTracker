import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Tooltip } from "bootstrap";
import { EventClickArg } from "@fullcalendar/core/index.js";
import EditTimeRecordModal from "../features/Modals/EditTimeRecordModal/EditTimeRecordModal";
import { TimeRecord } from "../utils/LocalStorage";
import { getLocalDateTime, getLocalStringFormat } from "../utils/Time";
import { convertTimeRecordsToCalendarEvents } from "../utils/Calendar";
import { useTimeRecordContext } from "../contexts/TimeRecordContext";

enum EnumCalendarModes {
  MONTH = "dayGridMonth",
  WEEK = "timeGridWeek",
  DAY = "timeGridDay",
}

const Calendar = () => {
  const [currentView, setCurrentView] = useState<EnumCalendarModes>(
    EnumCalendarModes.MONTH
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<TimeRecord | null>(null);
  const slotDurations = [
    "00:05:00",
    "00:10:00",
    "00:15:00",
    "00:30:00",
    "01:00:00",
  ];
  const [slotIndex, setSlotIndex] = useState(2);

  const { records, setRecords } = useTimeRecordContext();

  const events = convertTimeRecordsToCalendarEvents(records);

  const handleEditClick = (info: EventClickArg) => {
    const timeRecordObject: TimeRecord = {
      id: info.event._def.publicId,
      description: info.event._def.title,
      duration: info.event._def.extendedProps.duration,
      startTime: getLocalDateTime(info.event.start),
      endTime: getLocalDateTime(info.event.end),
      project: info.event._def.extendedProps.project,
    };

    setSelectedRecord(timeRecordObject);
    setShowEditModal(true);
  };

  return (
    <>
      <div className="text-center">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            background: "#f5f5f5",
          }}
        >
          <div
            style={{
              visibility:
                currentView === EnumCalendarModes.MONTH ? "hidden" : "visible",
            }}
            className="d-flex align-items-center gap-2"
          >
            <input
              type="range"
              min="0"
              max={slotDurations.length - 1}
              step="1"
              value={slotIndex}
              onChange={(e) => setSlotIndex(Number(e.target.value))}
            />
            <span>{`${slotDurations[slotIndex]}`}</span>
          </div>

          <div>
            <button onClick={() => setCurrentView(EnumCalendarModes.MONTH)}>
              📅 Months
            </button>
            <button onClick={() => setCurrentView(EnumCalendarModes.WEEK)}>
              🗓️ Weeks
            </button>
            <button onClick={() => setCurrentView(EnumCalendarModes.DAY)}>
              📆 Days
            </button>
          </div>
        </div>

        <FullCalendar
          key={currentView}
          eventDisplay="block"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={currentView}
          editable={true}
          events={events}
          selectable={true}
          slotDuration={slotDurations[slotIndex]}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }}
          eventContent={(info) => {
            const infoTitle = `${
              info.event._def.extendedProps.project.title || "Nezařazený"
            } - ${info.event.title || "Bez popisu"}`;
            return (
              <div title={infoTitle} className="align-items-center px-2">
                <span>{infoTitle}</span>
              </div>
            );
          }}
          eventClick={handleEditClick}
          eventDidMount={(info) => {
            new Tooltip(info.el, {
              title: `${getLocalStringFormat(
                info.event.start
              )} - ${getLocalStringFormat(info.event.end)}`,
              placement: "top",
              trigger: "hover",
              container: "body",
            });
          }}
          headerToolbar={false}
        />
      </div>
      <EditTimeRecordModal
        data={selectedRecord}
        show={showEditModal}
        setData={setRecords}
        onClose={() => {
          setShowEditModal(false);
        }}
      />
    </>
  );
};

export default Calendar;
