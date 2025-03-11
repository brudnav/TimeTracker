import { formatTime } from "../../../utils/Time";
import { useTimeTracking } from "../hooks/useTimeTracking";

const TimerTime = () => {
  const { recordHandler, duration, timerIsRunning, stopTime, startTime } =
    useTimeTracking();
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
          <p className="m-0">{formatTime(duration)}</p>
          {timerIsRunning ? (
            <button className="btn btn-success" onClick={stopTime}>
              Stop
            </button>
          ) : (
            <button className="btn btn-success" onClick={startTime}>
              Start
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimerTime;
