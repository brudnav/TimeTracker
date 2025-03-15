import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Navbar />
      <div className="container py-3">
        <Outlet />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
