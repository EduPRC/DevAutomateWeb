import React from 'react';
import "../assets/Dashboard.css";
import "../assets/Grafics.css";
import { 
  BarChart, 
  Bar, 
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
import { BookOpen, Clock, Target } from 'lucide-react';

const learningProgressData = [
  { name: "Introdução a IA", time: 45, completed: 100 },
  { name: "Automação", time: 60, completed: 80 },
  { name: "Engenharia de prompts", time: 40, completed: 60 },
  { name: "Dados com pandas", time: 55, completed: 90 },
  { name: "Machine Learning", time: 70, completed: 50 },
];

const courseCompletionData = [
  { name: "Iniciante", courses: 3 },
  { name: "Intermediário", courses: 2 },
  { name: "Avançado", courses: 1 },
];

const projectProgressData = [
  { name: "Python Automation", progress: 80, remaining: 20 },
  { name: "Data Analysis", progress: 70, remaining: 30 },
  { name: "ML Project", progress: 50, remaining: 50 },
];

export default function UserGrafics() {
  const totalLearningTime = learningProgressData.reduce((sum, item) => sum + item.time, 0);
  const averageCompletion = (learningProgressData.reduce((sum, item) => sum + item.completed, 0) / learningProgressData.length).toFixed(0);

  return (
    <div className="dashboard__graphics">
      <div className="dashboard__graphics-container">
        {/* Overview Cards */}
        <div className="dashboard__graphics-card dashboard__card-box">
          <div className="dashboard__card">
            <div className="dashboard__card-content">
              <span className="dashboard__card-value">{totalLearningTime} mins</span>
              <span className="dashboard__card-title">Total Learning Time</span>
            </div>
            <Clock className="dashboard__card-icon" />
          </div>
          <div className="dashboard__card">
            <div className="dashboard__card-content">
              <span className="dashboard__card-value">{averageCompletion}%</span>
              <span className="dashboard__card-title">Average Course Completion</span>
            </div>
            <Target className="dashboard__card-icon" />
          </div>
          <div className="dashboard__card">
            <div className="dashboard__card-content">
              <span className="dashboard__card-value">Intermediate</span>
              <span className="dashboard__card-title">Skill Level</span>
            </div>
            <BookOpen className="dashboard__card-icon" />
          </div>
        </div>

        {/* Learning Progress Chart */}
        <div className="dashboard__graphics-card">
          <h2 className="dashboard__graphics-title">Course Learning Progress</h2>
          <div className="dashboard__graphics-content">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={learningProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="time" 
                  fill="var(--primary)" 
                  name="Learning Time (mins)"
                />
                <Bar 
                  dataKey="completed" 
                  fill="var(--secondary)" 
                  name="Completion (%)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Completion Distribution */}
        <div className="dashboard__graphics-card">
          <h2 className="dashboard__graphics-title">Course Level Distribution</h2>
          <div className="dashboard__graphics-content">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={courseCompletionData} 
                  dataKey="courses" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius="80%" 
                  fill="var(--primary)"
                  label
                >
                  {courseCompletionData.map((entry, index) => (
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

        {/* Project Progress */}
        <div className="dashboard__graphics-card">
          <h2 className="dashboard__graphics-title">Project Progress</h2>
          <div className="dashboard__graphics-content">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="progress" 
                  fill="var(--primary)" 
                  name="Progress"
                />
                <Bar 
                  dataKey="remaining" 
                  fill="var(--secondary)" 
                  name="Remaining"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}