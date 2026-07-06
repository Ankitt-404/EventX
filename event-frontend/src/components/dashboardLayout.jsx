import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./sideBar.jsx";
import "./dashboardLayout.css";

function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="menuButton"
        onClick={() => setOpen(!open)}
      >
        <FaBars />
      </button>

      <Sidebar open={open} setOpen={setOpen} />

      <main className="dashboardContent">
        {children}
      </main>
    </>
  );
}

export default DashboardLayout;