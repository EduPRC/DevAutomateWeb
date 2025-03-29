import React from "react";
import Sidebar from "../components/Sidebar";
import RecentProjects from "../components/RecentProjects";
import Navbar from "../components/Navbar";
import "../assets/Dashboard.css";

const UserDashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <Navbar />
        <Sidebar />

        <div className="dashboard__main">
          <div className="dashboard__details">
            {/* Only show this user's projects */}
            <RecentProjects adminView={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;