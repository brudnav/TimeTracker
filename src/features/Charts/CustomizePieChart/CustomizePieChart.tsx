import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetProjects } from "../../../api/queries/projectQuery";
import {
  getLocaleStorageRecords,
  ProjectData,
} from "../../../utils/LocalStorage";
import { useEffect } from "react";

interface CustomizePieChartProps {
  setExportData: (project: ProjectData) => void;
}

const CustomizePieChart: React.FC<CustomizePieChartProps> = ({
  setExportData,
}) => {
  const { data: projects, isLoading, isError } = useGetProjects();
  useEffect(() => {
    setExportData(processProjectData());
  }, [projects]);

  const records = getLocaleStorageRecords();

  const secondsToHours = (seconds: number): number => {
    return parseFloat((seconds / 3600).toFixed(2));
  };

  const countProjectsDuration = (project: ProjectData) => {
    return records?.reduce((prev, curr) => {
      if (curr.project.title === project.title) {
        return prev + curr.duration;
      }

      return prev;
    }, 0);
  };

  const processProjectData = (): ProjectData[] => {
    const data = projects?.map((project) => ({
      name: project.title,
      hours: secondsToHours(countProjectsDuration(project)),
      color: project.color,
    }));

    const filteredData = data?.filter((d) => d.hours !== 0);
    return filteredData;
  };

  if (isLoading) {
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>;
  }

  if (isError) {
    <div>Something broken</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={processProjectData()}
          dataKey="hours"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
          stroke="none"
        >
          {processProjectData()?.map((data, index) => (
            <Cell key={`cell-${index}`} fill={data.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomizePieChart;
