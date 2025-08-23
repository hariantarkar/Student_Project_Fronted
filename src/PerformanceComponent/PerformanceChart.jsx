import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./PerformanceChart.css";

const data = [
  { name: "Attendance", value: 10 },
  { name: "Machine Test", value: 8 },
  { name: "MCQ Test", value: 6 },
  { name: "Mock Interview", value: 10 },
];

const COLORS = ["#4d36a0ff", "#224b43ff", "#cc3237ff", "#FF8042"];
const totalScore = data.reduce((acc, item) => acc + item.value, 0);

export default function DynamicPerformanceDonutChart() {
  return (
    <div className="chart-container">
      <h3 className="chart-title">Student Performance</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={120}
            labelLine={true} // remove lines inside
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} // labels outside
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${((value / totalScore) * 100).toFixed(0)}%`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
