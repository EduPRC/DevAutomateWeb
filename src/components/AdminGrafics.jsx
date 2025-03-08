import "../assets/Grafics.css";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Card, { CardContent } from "../components/Card";

const userData = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 600 },
  { name: "Mar", users: 800 },
  { name: "Apr", users: 1000 },
];

const viewData = [
  { name: "Jan", views: 2000 },
  { name: "Feb", views: 3000 },
  { name: "Mar", views: 4500 },
  { name: "Apr", views: 5000 },
];

const searchData = [
  { name: "Pesquisa A", value: 30 },
  { name: "Pesquisa B", value: 50 },
  { name: "Pesquisa C", value: 20 },
];

const COLORS = ["rgb(9, 111, 129)", "rgb(14, 134, 155)", "rgb(13, 178, 207)"];

export default function AdminDashboard() {
  return (
    <div className="dashboard-container">
      {/* Card de Usuários */}
      <Card className="dashboard-card">
        <h2 className="dashboard-title">Usuários</h2>
        <CardContent>
          <ResponsiveContainer width={400} height={200}>
            <LineChart data={userData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="rgb(25, 148, 170)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Card de Visualizações */}
      <Card className="dashboard-card">
        <h2 className="dashboard-title">Visualizações</h2>
        <CardContent >
          <ResponsiveContainer width={400} height={200}>
            <BarChart data={viewData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="rgb(54, 154, 172)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Card de Pesquisas */}
      <Card className="dashboard-card">
        <h2 className="dashboard-title">Pesquisas</h2>
        <CardContent>
          <ResponsiveContainer width={400} height={200}>
            <PieChart>
              <Pie data={searchData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                {searchData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
