import React from "react";
import ContentLoader from "react-content-loader";

const DashboardLoader = (props) => {
  // Calculate scale factors
  const scaleX = 1920 / 820;
  const scaleY = 1080 / 450;

  // Scale each rect
  const rects = [
    { x: 10, y: 10, width: 260, height: 140 },
    { x: 280, y: 10, width: 260, height: 280 },
    { x: 550, y: 10, width: 260, height: 140 },
    { x: 10, y: 160, width: 260, height: 280 },
    { x: 280, y: 300, width: 260, height: 140 },
    { x: 550, y: 160, width: 260, height: 280 },
  ].map((rect) => ({
    ...rect,
    x: rect.x * scaleX,
    y: rect.y * scaleY,
    width: rect.width * scaleX,
    height: rect.height * scaleY,
  }));

  return (
    <ContentLoader
      viewBox="0 0 1920 1080"
      height={1080}
      width={1920}
      {...props}
    >
      {rects.map((rect, i) => (
        <rect
          key={i}
          x={rect.x}
          y={rect.y}
          rx="5"
          ry="5"
          width={rect.width}
          height={rect.height}
        />
      ))}
    </ContentLoader>
  );
};

export default DashboardLoader;
