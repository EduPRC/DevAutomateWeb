import React from 'react';
import "../assets/Dashboard.css";
import "../assets/Grafics.css";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from "recharts";
import { Users, TrendingUp, Globe } from 'lucide-react';

const userData = [
  { name: "Jan", newUsers: 400, totalUsers: 2000, activeUsers: 350 },
  { name: "Feb", newUsers: 600, totalUsers: 2600, activeUsers: 520 },
  { name: "Mar", newUsers: 800, totalUsers: 3400, activeUsers: 700 },
  { name: "Apr", newUsers: 1000, totalUsers: 4400, activeUsers: 900 },
  { name: "May", newUsers: 1200, totalUsers: 5600, activeUsers: 1100 },
];

const platformEngagementData = [
  { name: "Web", value: 45 },
  { name: "Mobile", value: 30 },
  { name: "Desktop", value: 25 },
];

const activityMetricsData = [
  { name: "Logins", value: 5000 },
  { name: "Content Views", value: 15000 },
  { name: "Actions Performed", value: 8000 },
];

export default function AdminGrafics() {
  const totalNewUsers = userData.reduce((sum, item) => sum + item.newUsers, 0);
  const totalActiveUsers = userData[userData.length - 1].totalUsers;

  return (
    <div className="dashboard__graphics">
      <div className="dashboard__graphics-container">
        {/* Overview Card */}
        <div className="dashboard__graphics-card dashboard__card-box">
          <div className="dashboard__card">
            <div className="dashboard__card-content">
              <span className="dashboard__card-value">{totalActiveUsers.toLocaleString()}</span>
              <span className="dashboard__card-title">Total Users</span>
            </div>
            <Users className="dashboard__card-icon" />
          </div>
          <div className="dashboard__card">
            <div className="dashboard__card-content">
              <span className="dashboard__card-value">{totalNewUsers.toLocaleString()}</span>
              <span className="dashboard__card-title">New Users (Last 5 Months)</span>
            </div>
            <TrendingUp className="dashboard__card-icon" />
          </div>
          <div className="dashboard__card">
            <div className="dashboard__card-content">
              <span className="dashboard__card-value">5</span>
              <span className="dashboard__card-title">Countries Reached</span>
            </div>
            <Globe className="dashboard__card-icon" />
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="dashboard__graphics-card">
          <h2 className="dashboard__graphics-title">User Growth Trends</h2>
          <div className="dashboard__graphics-content">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="newUsers" 
                  stroke="var(--primary)" 
                  name="New Users"
                />
                <Line 
                  type="monotone" 
                  dataKey="totalUsers" 
                  stroke="var(--secondary)" 
                  name="Total Users"
                />
                <Line 
                  type="monotone" 
                  dataKey="activeUsers" 
                  stroke="var(--tercery)"
                  name="Active Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Engagement */}
        <div className="dashboard__graphics-card">
          <h2 className="dashboard__graphics-title">Platform Engagement</h2>
          <div className="dashboard__graphics-content">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={platformEngagementData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius="80%" 
                  fill="var(--primary)"
                  label
                >
                  {platformEngagementData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={[
                        "var(--primary)", 
                        "var(--secondary)", 
                        "var(--tercery)",
                      ][index % 3]} 
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Metrics */}
        <div className="dashboard__graphics-card">
          <h2 className="dashboard__graphics-title">Activity Metrics</h2>
          <div className="dashboard__graphics-content">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityMetricsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="value" 
                  fill="var(--primary)" 
                  name="Activity Count"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}