import React from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";

const EnergyMeter = ({ value }) => {
  const data = [
    { name: "Active", value: value },
    { name: "Inactive", value: 100 - value },
  ];

  // Render the custom needle as an SVG path
  const renderNeedle = (value, color) => {
    const degrees = (value / 100) * 180; // Convert value to degrees (0 - 180)
    const radians = (degrees * Math.PI) / 180;
    const radius = 70; // Should be adjusted based on the outer radius of the Pie chart
    // Calculate the position of the needle tip
    const x = 100 + radius * Math.cos(Math.PI - radians);
    const y = 100 - radius * Math.sin(Math.PI - radians);
    // Path for the needle shape
    const path = `M100,100 L${x},${y} L100,20 Z`;
    return <path d={path} fill={color} stroke="black" strokeWidth="1" />;
  };

  return (
    <PieChart width={200} height={100}>
      <Pie
        data={data}
        cx={100}
        cy={100}
        startAngle={180}
        endAngle={0}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        isAnimationActive={false}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={index === 0 ? "#82ca9d" : "#d0d0d0"}
          />
        ))}
        <Sector
          cx={100}
          cy={100}
          innerRadius={90}
          outerRadius={100}
          startAngle={180}
          endAngle={180 - (value / 100) * 180}
          fill="black"
        />
      </Pie>
      {renderNeedle(value, "red")}
    </PieChart>
  );
};

export default EnergyMeter;
