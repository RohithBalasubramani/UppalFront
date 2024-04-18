import React, { useEffect, useRef, useState } from "react";
import { Doughnut, Pie, getElementAtEvent } from "react-chartjs-2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
ChartJS.register(ArcElement, Tooltip);

const DonutChart = ({ data }) => {
  const navigate = useNavigate();
  const chartRef = useRef();
  console.log(data);

  // Empty dependency array to run the effect only once

  // Check if either dataAmf1 or dataAmf2 is null
  if (!data) {
    return <div>Data is null. Unable to render the chart.</div>;
  }

  //   console.log(dataOG);

  //   const totalOG2 = dataOG.reduce((total, data) => {
  //     return total + data.cellltpanel1data;
  //   }, 0);
  //   const totalOG1 = dataOG.reduce((total, data) => {
  //     return total + data.celltoolpdb1data;
  //   }, 0);
  //   const totalOG3 = dataOG.reduce((total, data) => {
  //     return total + data.ups1og1data;
  //   }, 0);
  //   const totalOG4 = dataOG.reduce((total, data) => {
  //     return total + data.ups2og1data;
  //   }, 0);
  //   console.log(totalOG2);

  // Function to calculate cumulative values for a specific property
  //   const calculateCumulative = (dataArray, property) => {
  //     return dataArray.reduce((acc, entry) => acc + entry[property], 0);
  //   };

  //   // Calculate cumulative values for og2_kwh for each inner array
  //   const cumulativeOg2KwhArray = dataAmf1.map((innerArray) =>
  //     calculateCumulative(innerArray, "og2_kwh")
  //   );

  //   // Calculate the total cumulative value for all inner arrays
  //   const totalCumulativeOg2Kwh = cumulativeOg2KwhArray.reduce(
  //     (sum, value) => sum + value,
  //     0
  //   );
  const endpointsArray = data.map((item) => item.endpoint);
  const kwhDifferenceArray = data.map((item) => item.kwhDifference);
  console.log(endpointsArray);
  console.log(kwhDifferenceArray);

  const chartData = {
    labels: endpointsArray,
    datasets: [
      {
        data: kwhDifferenceArray,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        link: [
          "/og1/cellltpanel1data",
          "/og1/pcc1incomerdata",
          "/og1/ups1og1data",
          "/og1/ups2og1data",
        ],
      },
    ],
  };

  const chartOptions = {
    aspectRatio: 3,
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Cumulative OG2_kwh",
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  //   const handleSegmentClick = (event) => {
  //     // Check if any segment is clicked
  //     const elements = getElementAtEvent(chartref.current, event);

  //     if (elements.length > 0) {
  //       // Assuming the label of the segment is the property name (e.g., "OG1_kwh")
  //       const chartindex = elements[0]._index;

  //       // Check if the index is within the bounds of the link array
  //       if (chartindex >= 0 && chartindex < chartData.link.length) {
  //         // Redirect to another page based on the clicked segment's link
  //         const clickedLink = chartData.link[chartindex];
  //         navigate(clickedLink);
  //       }
  //     }
  //   };

  //   const onClickDonut = (event) => {
  //     // if (getElementAtEvent(chartref.current, event).length > 0) {
  //     //   const datasetIndex = getElementAtEvent(chartref.current, event)[0]
  //     //     .datasetIndex;
  //     //   const Datapoint = getElementAtEvent(chartref.current, event)[0].index;
  //     //   navigate(chartData.datasets[datasetIndex].link[Datapoint]);
  //     // }
  //     console.log(getElementAtEvent());
  //   };

  const onClickDonut = (event) => {
    const elements = getElementAtEvent(chartRef.current, event);

    if (elements.length > 0) {
      // Your existing logic for handling the click
      console.log("Click event:", elements[0]);
      const datasetIndex = elements[0].datasetIndex;
      const Datapoint = elements[0].index;

      navigate(chartData.datasets[datasetIndex].link[Datapoint]);
    }
  };
  // Render the chart
  return (
    <div>
      <Doughnut
        onClick={onClickDonut}
        ref={chartRef}
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default DonutChart;
