import { useTimeTracking } from "../hooks/useTimeTracking";
import TimerControls from "./TimerControls";
import TimerManual from "./TimerManual";
import TimerTime from "./TimerTime";

const TimerPanel = () => {
  const { manualMode, setManualMode } = useTimeTracking();
  return (
    <div className="d-flex gap-2">
      {manualMode ? <TimerManual /> : <TimerTime />}
      <TimerControls manualMode={manualMode} setManualMode={setManualMode} />
    </div>
  );
};

export default TimerPanel;
