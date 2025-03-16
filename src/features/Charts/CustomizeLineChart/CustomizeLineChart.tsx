import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const weeklyData = [
  { day: "Pondělí", hours: 5 },
  { day: "Úterý", hours: 6 },
  { day: "Středa", hours: 8 },
  { day: "Čtvrtek", hours: 7 },
  { day: "Pátek", hours: 5 },
  { day: "Sobota", hours: 3 },
  { day: "Neděle", hours: 2 },
];

const CustomizeLineChart = ({ setExportData }) => {
  setExportData(weeklyData);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={weeklyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="hours"
          stroke="#8884d8"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomizeLineChart;
