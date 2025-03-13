import Calendar from "../components/Calendar";
import TimerPanel from "../features/Timer/components/TimerPanel";

const TimerPage = () => {
  return (
    <div className="vstack gap-5">
      <TimerPanel />
      <Calendar />
    </div>
  );
};

export default TimerPage;
