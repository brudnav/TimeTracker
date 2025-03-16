import { EventSourceInput } from "@fullcalendar/core/index.js";
import { TimeRecord } from "./LocalStorage";

export const convertTimeRecordsToCalendarEvents = (
  records: TimeRecord[]
): EventSourceInput[] => {
  const eventSourceInputs = records.map((record) => ({
    id: record.id,
    title: record.description,
    start: record.startTime,
    end: record.endTime,
    allDay: false,
    eventDisplay: "auto",
    color: record.project.color || "#000",
    backgroundColor: record.project.color || "#000",
    borderColor: record.project.color || "#000",
    extendedProps: {
      duration: record.duration,
      project: {
        id: record.project.id,
        title: record.project.title,
        color: record.project.color || "#000",
      },
    },
  }));
  return eventSourceInputs;
};
