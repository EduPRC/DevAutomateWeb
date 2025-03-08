import "../assets/Grafics.css";
import {
  BarChart,
  Bar,
  PieChart, Pie, Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card, { CardContent } from "../components/Card";

const tutoriaisData = [
  { name: "Introdução a IA", time: 45 },
  { name: "Automação", time: 60 },
  { name: "Engenharia de prompts", time: 40 },
  { name: "Dados com pandas", time: 55 },
];

const projeto1Data = [
  { name: "Automação de Tarefas com Python", porcent: 80 },
  { name: "Tempo restante", porcent: 20 },
];

const projeto2Data = [
  { name: "Analisador de Dados com Pandas", porcent: 70 },
  { name: "Tempo restante", porcent: 30 },
];

const COLORS = ["rgb(13, 178, 207)", "#a0a0a0"];

export default function UserDashboard() {
  return (
    <div className="dashboard-container">
      {/* Card de Visualizações */}
      <Card className="dashboard-card">
        <h2 className="dashboard-title">Tempo por Tutoriais</h2>
        <CardContent>
          <ResponsiveContainer width={800} height={200}>
            <BarChart data={tutoriaisData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="time" fill="rgb(13, 178, 207)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Card de Pesquisas */}
      <Card className="dashboard-card">
        <h2 className="dashboard-title">Automação de Tarefas com Python</h2>
        <CardContent>
          <ResponsiveContainer width={400} height={200}>
            <PieChart>
              <Pie
                data={projeto1Data}
                dataKey="porcent"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {projeto1Data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="dashboard-card">
        <h2 className="dashboard-title">Analisador de Dados com Pandas</h2>
        <CardContent>
          <ResponsiveContainer width={400} height={200}>
            <PieChart>
              <Pie
                data={projeto2Data}
                dataKey="porcent"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {projeto2Data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
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
