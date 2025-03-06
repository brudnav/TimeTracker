import { useState } from "react";
import { formatTime } from "../../../utils/Time";

const TimerControls = () => {
  const [time, setTime] = useState(0);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [recordDescription, setRecordDescription] = useState("");
  const [recordProject, setRecordProject] = useState("");

  const startTime = () => {
    setTime(0);
    setTimerIsRunning(true);
    const id = setInterval(() => {
      setTime((prevTime) => ++prevTime);
      console.log("tik");
    }, 1000);
    setIntervalId(id);
  };

  const stopTime = () => {
    clearInterval(intervalId);
    setTimerIsRunning(false);
    setIntervalId(null);
  };

  return (
    <div className="card container border-0 shadow-lg">
      <div className="card-body hstack justify-content-between">
        <input
          style={{ width: "300px" }}
          type="text"
          placeholder="Label"
          className="form-control"
          onChange={(e) => {
            setRecordDescription(e.target.value);
          }}
        />
        <div className="d-flex align-items-center gap-3">
          <select
            className="form-select"
            onChange={(e) => {
              setRecordProject(e.target.value);
            }}
          >
            <option selected value="">
              Choose Project
            </option>
            <option value="Project1">Project1</option>
            <option value="Project2">Project2</option>
            <option value="Project3">Project3</option>
          </select>
          <p className="m-0">{formatTime(time)}</p>
          {timerIsRunning ? (
            <button className="btn btn-success" onClick={stopTime}>
              Stop
            </button>
          ) : (
            <button className="btn btn-success" onClick={startTime}>
              Start
            </button>
          )}

          <div className="d-flex flex-column gap-1">
            <button className="btn btn-primary">Timer Mode</button>
            <button className="btn btn-primary">Manual Mode</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerControls;
