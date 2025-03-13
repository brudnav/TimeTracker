import { useState } from "react";
import {
  getLocalDateTimeNow,
  getTimeDifferenceInSeconds,
} from "../../../utils/Time";
import {
  setLocaleStorageRecords,
  TimeRecord,
} from "../../../utils/LocalStorage";
import { v4 as uuidv4 } from "uuid";
import { useTimeRecordContext } from "../../../contexts/TimeRecordContext";

export const useTimeTracking = () => {
  const [duration, setDuration] = useState<number>(0);
  const [timerIsRunning, setTimerIsRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [manualMode, setManualMode] = useState<boolean>(false);
  const [record, setRecord] = useState<TimeRecord>({
    id: "",
    description: "",
    project: "",
    duration: 0,
    startTime: "",
    endTime: "",
  });

  const { setRecords } = useTimeRecordContext();

  const recordHandler = (name: string, value: string | number | object) => {
    setRecord((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const startTime = () => {
    const startTime = getLocalDateTimeNow();
    recordHandler("startTime", startTime);
    setDuration(0);
    setTimerIsRunning(true);
    const id = setInterval(() => {
      setDuration((prevTime) => ++prevTime);
    }, 1000);
    setIntervalId(id);
  };

  const stopTime = () => {
    const endTime = getLocalDateTimeNow();
    clearInterval(intervalId!);
    setTimerIsRunning(false);
    setIntervalId(null);
    setRecord((prevRecord) => {
      const updatedRecord = {
        ...prevRecord,
        duration,
        endTime,
        id: uuidv4(),
      };
      setRecords(setLocaleStorageRecords(updatedRecord));
      return updatedRecord;
    });
    setDuration(0);
  };

  const addTimeEntry = () => {
    const diff = getTimeDifferenceInSeconds(record.startTime, record.endTime);
    setRecord((prevRecord) => {
      const updatedRecord = {
        ...prevRecord,
        duration: diff,
        id: uuidv4(),
      };
      setRecords(setLocaleStorageRecords(record));
      return updatedRecord;
    });
  };

  return {
    recordHandler,
    manualMode,
    duration,
    addTimeEntry,
    timerIsRunning,
    stopTime,
    startTime,
    setManualMode,
  };
};
