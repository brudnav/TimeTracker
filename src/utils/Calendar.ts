import { EventSourceInput } from "@fullcalendar/core/index.js";
import { TimeRecord } from "./LocalStorage";

export const convertTimeRecordsToCalendarEvents = (
  records: TimeRecord[]
): EventSourceInput[] => {
  const eventSourceInputs = records.map((record) => ({
    id: record.id,
    title: record.description || "Neznámá událost",
    start: record.startTime,
    end: record.endTime,
    allDay: false,
    color: "#e74c3c",
    extendedProps: {
      duration: record.duration,
      project: record.project || "Nezařazený",
    },
  }));
  console.log("Calendar Events", eventSourceInputs);
  return eventSourceInputs;
};
