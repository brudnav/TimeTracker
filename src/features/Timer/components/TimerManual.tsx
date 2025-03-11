import { useTimeTracking } from "../hooks/useTimeTracking";

const TimerManual = () => {
  const { recordHandler, addTimeEntry } = useTimeTracking();
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
          <button className="btn btn-success" onClick={addTimeEntry}>
            Add Time Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerManual;
