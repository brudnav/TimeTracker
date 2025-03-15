import { useGetProjects } from "../../../api/queries/projectQuery";
import { formatTime } from "../../../utils/Time";
import { useTimeTracking } from "../hooks/useTimeTracking";

const TimerTime = () => {
  const { recordHandler, duration, timerIsRunning, stopTime, startTime } =
    useTimeTracking();

  const { data: projects } = useGetProjects();

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
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
          <p className="m-0">{formatTime(duration)}</p>
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
        </div>
      </div>
    </div>
  );
};

export default TimerTime;
