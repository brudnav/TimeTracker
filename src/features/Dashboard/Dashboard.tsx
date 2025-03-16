import { useState } from "react";
import CustomizePieChart from "../Charts/CustomizePieChart/CustomizePieChart";
import CustomizeLineChart from "../Charts/CustomizeLineChart/CustomizeLineChart";

enum EnumNavItems {
  ALL = "ALL",
  WEEK = "WEEK",
}

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState<EnumNavItems>(EnumNavItems.ALL);
  const [exportData, setExportData] = useState(null);
  const handleActiveItem = (active: EnumNavItems) => {
    setActiveItem(active);
  };

  const exportToCSV = (data, filename = "data.csv") => {
    let csvContent;
    if (EnumNavItems.ALL === activeItem) {
      csvContent = [
        ["Project", "Hours"],
        ...data.map((row) => [row.name, row.hours]),
      ];
    }
    if (EnumNavItems.WEEK === activeItem) {
      csvContent = [
        ["Day", "Hours"],
        ...data.map((row) => [row.day, row.hours]),
      ];
    }

    csvContent = csvContent.map((e) => e.join(";")).join("\n");

    const bom = "\uFEFF"; //potřebuje excel pro správné formátování diakritiky
    const blob = new Blob([bom + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    exportToCSV(exportData);
  };

  return (
    <>
      <h1>Dashboard</h1>
      <div className="card">
        <div className="d-flex justify-content-between align-items-center card-body">
          <ul className="navbar-nav hstack gap-2">
            <li
              onClick={() => {
                handleActiveItem(EnumNavItems.ALL);
              }}
              className={
                activeItem === EnumNavItems.ALL ? "nav-link active" : "nav-link"
              }
            >
              All time
            </li>
            <li
              onClick={() => {
                handleActiveItem(EnumNavItems.WEEK);
              }}
              className={
                activeItem === EnumNavItems.WEEK
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Week Summary
            </li>
          </ul>
          <button onClick={handleExport} className="btn btn-success">
            Export
          </button>
        </div>
      </div>
      {activeItem === EnumNavItems.ALL && (
        <CustomizePieChart setExportData={setExportData} />
      )}
      {activeItem === EnumNavItems.WEEK && (
        <CustomizeLineChart setExportData={setExportData} />
      )}
    </>
  );
};

export default Dashboard;
