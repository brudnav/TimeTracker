import { useGetProjects } from "../../../api/queries/projectQuery";
import { useTimeTracking } from "../hooks/useTimeTracking";

const TimerManual = () => {
  const { recordHandler, addTimeEntry, record } = useTimeTracking();
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
            name="project"
            value={record.project.title}
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
          <div className="vstack justify-content-center gap-3">
            <div>
              <input
                name="startTime"
                value={record.startTime}
                type="datetime-local"
                step={1}
                className="form-control m-0"
                onChange={({ target }) => {
                  recordHandler(target.name, target.value);
                }}
              />
            </div>
            <div>
              <input
                name="endTime"
                value={record.endTime}
                type="datetime-local"
                step={1}
                className="form-control m-0"
                onChange={({ target }) => {
                  recordHandler(target.name, target.value);
                }}
              />
            </div>
          </div>
          <button
            className="btn btn-success"
            onClick={() => {
              addTimeEntry(projects);
            }}
          >
            Add Time Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerManual;
