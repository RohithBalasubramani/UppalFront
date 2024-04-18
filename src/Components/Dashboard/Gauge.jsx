import React from "react";
import { Cell, PieChart, Pie, Sector, Text } from "recharts";

const GaugeChart = ({ value, fillColor }) => {
  const data = [
    { name: "Value", value: value },
    { name: "Rest", value: 100 - value },
  ];

  const renderCustomizedLabel = ({ cx, cy }) => {
    return (
      <Text
        x={cx}
        y={cy}
        fill="#333"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${value}%`}
      </Text>
    );
  };

  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
    } = props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        {renderCustomizedLabel({ cx, cy })}
      </g>
    );
  };

  return (
    <PieChart width={200} height={100}>
      <Pie
        activeIndex={0}
        activeShape={renderActiveShape}
        data={data}
        cx={100}
        cy={100}
        innerRadius={60}
        outerRadius={80}
        startAngle={180}
        endAngle={0}
        fill={fillColor}
        dataKey="value"
        cornerRadius={20}
        stroke={null}
        isAnimationActive={false}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={index === 0 ? fillColor : "none"} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default GaugeChart;
