"use client"
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

const data = [
  { name: 'Category A', value: 30 },
  { name: 'Category B', value: 25 },
  { name: 'Category C', value: 45 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Chart = () => {
  return (
    <PieChart width={150} height={150}>
      <Pie
        data={data}
        cx={75}
        cy={75}
        innerRadius={30}
        outerRadius={40}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default Chart;
