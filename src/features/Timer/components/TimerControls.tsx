import { useState } from "react";
import {
  formatTime,
  getLocalDateTime,
  getTimeDifferenceInSeconds,
} from "../../../utils/Time";
import {
  setLocaleStorageRecords,
  TimeRecord,
} from "../../../utils/LocalStorage";
import { v4 as uuidv4 } from "uuid";
const TimerControls = () => {
  const [duration, setDuration] = useState(0);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [manualMode, setManualMode] = useState(false);
  const [record, setRecord] = useState<TimeRecord>({
    id: uuidv4(),
    description: "",
    project: "",
    duration: 0,
    startTime: "",
    endTime: "",
  });

  const recordHandler = (name, value) => {
    setRecord((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const startTime = () => {
    const startTime = getLocalDateTime();
    recordHandler("startTime", startTime);
    setDuration(0);
    setTimerIsRunning(true);
    const id = setInterval(() => {
      setDuration((prevTime) => ++prevTime);
      console.log("tik");
    }, 1000);
    setIntervalId(id);
  };

  const stopTime = () => {
    const endTime = getLocalDateTime();
    clearInterval(intervalId);
    setTimerIsRunning(false);
    setIntervalId(null);
    setRecord((prevRecord) => {
      const updatedRecord = {
        ...prevRecord,
        duration,
        endTime,
      };
      setLocaleStorageRecords(updatedRecord);
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
      };
      setLocaleStorageRecords(record);
      console.log(formatTime(diff));
      return updatedRecord;
    });
  };

  return (
    <div className="card container border-0 shadow-lg">
      <div className="card-body hstack justify-content-between">
        <input
          style={{ width: "300px" }}
          type="text"
          name="description"
          placeholder="Label"
          className="form-control"
          onChange={({ target }) => {
            recordHandler(target.name, target.value);
          }}
        />
        <div className="d-flex align-items-center gap-3">
          <select
            className="form-select"
            name="project"
            onChange={({ target }) => {
              recordHandler(target.name, target.value);
            }}
          >
            <option defaultValue="">Choose Project</option>
            <option value="Project1">Project1</option>
            <option value="Project2">Project2</option>
            <option value="Project3">Project3</option>
          </select>
          {manualMode ? (
            <div className="vstack justify-content-center gap-3">
              <div>
                <input
                  name="startTime"
                  type="datetime-local"
                  className="form-control m-0"
                  onChange={({ target }) => {
                    recordHandler(target.name, target.value);
                  }}
                />
              </div>
              <div>
                <input
                  name="endTime"
                  type="datetime-local"
                  className="form-control m-0"
                  onChange={({ target }) => {
                    recordHandler(target.name, target.value);
                  }}
                />
              </div>
            </div>
          ) : (
            <p className="m-0">{formatTime(duration)}</p>
          )}

          {manualMode ? (
            <button className="btn btn-success" onClick={addTimeEntry}>
              Add Time Entry
            </button>
          ) : timerIsRunning ? (
            <button className="btn btn-success" onClick={stopTime}>
              Stop
            </button>
          ) : (
            <button className="btn btn-success" onClick={startTime}>
              Start
            </button>
          )}

          <div className="d-flex flex-column gap-1">
            <button
              onClick={() => setManualMode(false)}
              className={
                manualMode ? "btn btn-primary" : "btn btn-primary active"
              }
            >
              Timer Mode
            </button>
            <button
              onClick={() => setManualMode(true)}
              className={
                manualMode ? "btn btn-primary active" : "btn btn-primary"
              }
            >
              Manual Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerControls;
