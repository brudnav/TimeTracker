import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./scss/bootstrap.scss";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import TimerPage from "./pages/TimerPage.tsx";
import { Navigate } from "react-router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/timer" />} />
        <Route path="timer" element={<TimerPage />} />
        <Route path="projects" element={<ProjectsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
