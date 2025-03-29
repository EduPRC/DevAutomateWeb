import React from "react";
import Sidebar from "../components/Sidebar";
import RecentUsers from "../components/RecentUsers";
import RecentProjects from "../components/RecentProjects";
import Navbar from "../components/Navbar";
import "../assets/Dashboard.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <Navbar />
        <Sidebar isAdmin={true} />

        <div className="dashboard__main">
          <div className="dashboard__details">
            {/* Display recent users component for admins */}
            <RecentUsers adminView={true}/>
            {/* Display projects from all users */}
            <div className="dashboard__projects-section">
              <RecentProjects adminView={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;