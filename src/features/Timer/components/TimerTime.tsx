import { useState } from "react";
import { useGetProjects } from "../../../api/queries/projectQuery";
import { formatTime } from "../../../utils/Time";
import { useTimeTracking } from "../hooks/useTimeTracking";
import CreateAlarmModal from "../../Modals/CreateAlarmModal/CreateAlarmModal";

const TimerTime = () => {
  const {
    recordHandler,
    duration,
    timerIsRunning,
    stopTime,
    startTime,
    alarm,
    setAlarm,
    record,
  } = useTimeTracking();

  const [showCreateAlarmModal, setShowCreateAlarmModal] = useState(false);

  const { data: projects } = useGetProjects();

  return (
    <div className="card container border-0 shadow-lg">
      <div className="card-body hstack justify-content-between">
        <input
          style={{ width: "300px" }}
          type="text"
          name="description"
          value={record.description}
          placeholder="Label"
          className="form-control"
          onChange={({ target }) => {
            recordHandler(target.name, target.value);
          }}
        />
        <div className="d-flex align-items-center gap-3">
          <select
            className="form-select"
            value={record.project.title}
            name="project"
            onChange={({ target }) => {
              recordHandler(target.name, target.value);
            }}
          >
            <option defaultValue="">Choose Project</option>
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
          <div className="vstack align-items-center">
            <p className="m-0">{formatTime(duration)}</p>
            {alarm.isAlarmSet && (
              <p className="m-0 text-warning fw-bold">{alarm.alarmTime}</p>
            )}
          </div>
          {timerIsRunning ? (
            <button
              className="btn btn-success"
              onClick={() => {
                stopTime(projects);
              }}
            >
              Stop
            </button>
          ) : (
            <button className="btn btn-success" onClick={startTime}>
              Start
            </button>
          )}
          <span
            onClick={() => {
              if (!timerIsRunning) {
                setShowCreateAlarmModal(true);
              }
            }}
            style={{
              fontSize: "20px",
              cursor: "pointer",
              ...(!alarm.isAlarmSet && { filter: "grayscale(100%)" }),
            }}
          >
            🔔
          </span>
        </div>
      </div>
      <CreateAlarmModal
        show={showCreateAlarmModal}
        onClose={() => {
          setShowCreateAlarmModal(false);
        }}
        setData={setAlarm}
      />
    </div>
  );
};

export default TimerTime;
