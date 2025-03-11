interface TimerControlsProps {
  manualMode: boolean;
  setManualMode: (value: boolean) => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  manualMode,
  setManualMode,
}) => {
  return (
    <div className="d-flex flex-column gap-1">
      <button
        onClick={() => setManualMode(false)}
        className={manualMode ? "btn btn-primary" : "btn btn-primary active"}
      >
        ⏱️
      </button>
      <button
        onClick={() => setManualMode(true)}
        className={manualMode ? "btn btn-primary active" : "btn btn-primary"}
      >
        ✍️
      </button>
    </div>
  );
};

export default TimerControls;
