import * as React from "react";
import { useGaugeState } from "@mui/x-charts/Gauge";

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const pointerLength = outerRadius * 0.8; // Adjust pointer length here
  const pointerWidth = 10; // Adjust pointer width here

  const target = {
    x: cx + pointerLength * Math.sin(valueAngle),
    y: cy - pointerLength * Math.cos(valueAngle),
  };

  // Path for the pointer - a simple triangular shape
  const pointerPath = `M ${cx} ${cy} L ${target.x} ${target.y} L ${
    cx + (pointerWidth / 2) * Math.cos(valueAngle)
  } ${cy + (pointerWidth / 2) * Math.sin(valueAngle)} Z`;

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={pointerWidth / 2}
        fill="red"
        stroke="#333"
        strokeWidth="2"
      />
      <path
        d={pointerPath}
        fill="red"
        stroke="#333"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </g>
  );
}

export default GaugePointer;
