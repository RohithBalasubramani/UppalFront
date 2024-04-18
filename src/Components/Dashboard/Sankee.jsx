import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsSankey from "highcharts/modules/sankey";

// Initialize Sankey module
HighchartsSankey(Highcharts);

const options = {
  title: {
    text: "Energy Flow Chart [kW]",
  },
  series: [
    {
      keys: ["from", "to", "weight"],
      data: [
        ["Plant", "O/G-1 4000A FP ACB", 54],
        ["O/G-1 4000A FP ACB", "CELL PCC PANEL-1 4000A FP ACB", 54],
        ["CELL PCC PANEL-1 4000A FP ACB", "CELL LT PANEL-1 2000A FP ACB", 14],
        ["CELL PCC PANEL-1 4000A FP ACB", "CELL TOOLS PDB-1 2000A FP ACB", 20],
        ["CELL PCC PANEL-1 4000A FP ACB", "UPS1A INPUT", 5],
        ["CELL PCC PANEL-1 4000A FP ACB", "UPS1B INPUT", 5],
        ["CELL PCC PANEL-1 4000A FP ACB", "SOLAR 1600A FP ACB", 10],
        ["CELL LT PANEL-1 2000A FP ACB", "External DI Heater-1.1", 2],
        ["CELL LT PANEL-1 2000A FP ACB", "External DI Heater-1.2", 2],
        ["CELL LT PANEL-1 2000A FP ACB", "External DI Heater-2.1", 2],
        ["CELL LT PANEL-1 2000A FP ACB", "External DI Heater-2.2", 2],
        ["CELL LT PANEL-1 2000A FP ACB", "Diffusion-1", 2],
        ["CELL LT PANEL-1 2000A FP ACB", "Diffusion-2", 2],
        ["CELL LT PANEL-1 2000A FP ACB", "Diffusion-3", 2],

        ["CELL TOOLS PDB-1 2000A FP ACB", "Pre Annealing-1", 3],
        ["CELL TOOLS PDB-1 2000A FP ACB", "Pre Annealing-2", 3],
        ["CELL TOOLS PDB-1 2000A FP ACB", "Hot Water Tank-1", 3],
        ["CELL TOOLS PDB-1 2000A FP ACB", "Hot Water Tank-2", 3],
        ["CELL TOOLS PDB-1 2000A FP ACB", "Rear AIOX", 4],
        ["CELL TOOLS PDB-1 2000A FP ACB", "AIOX", 4],

        ["UPS1A INPUT", "UPS1A OUPUT", 3],
        ["UPS1B INPUT", "UPS1B OUPUT", 2],

        ["SOLAR 1600A FP ACB", "MFM", 10],

        ["Plant", "O/G-2 4000A FP ACB", 46],
        ["O/G-2 4000A FP ACB", "CELL PCC PANEL-2 4000A FP ACB", 46],

        ["CELL PCC PANEL-2 4000A FP ACB", "CELL LT PANEL-2 2500A FP ACB", 14],
        ["CELL PCC PANEL-2 4000A FP ACB", "CELL TOOLS PBD-2 1250A FP ACB", 12],
        [
          "CELL PCC PANEL-2 4000A FP ACB",
          "CELL TOOLS PBD-2.2 1250A FP ACB",
          10,
        ],
        ["CELL PCC PANEL-2 4000A FP ACB", "UPS1C INPUT", 5],
        ["CELL PCC PANEL-2 4000A FP ACB", "UPS1D INPUT", 5],

        ["CELL LT PANEL-2 2500A FP ACB", "AIOx (5 Tubes)-3", 2],
        ["CELL LT PANEL-2 2500A FP ACB", "Front PECVD (5 Tubes)-2", 2],
        ["CELL LT PANEL-2 2500A FP ACB", "Front PECVD (5 Tubes)-3", 2],
        ["CELL LT PANEL-2 2500A FP ACB", "Front PECVD (6 Tubes)-1", 2],
        ["CELL LT PANEL-2 2500A FP ACB", "Post Annealing (6 Tubes)-1", 3],
        ["CELL LT PANEL-2 2500A FP ACB", "Post Annealing (6 Tubes)-2", 3],

        ["CELL TOOLS PBD-2 1250A FP ACB", "INCOMER-MFM", 12],

        ["CELL TOOLS PBD-2.2 1250A FP ACB", "INCOMER-MFM 2", 10],

        ["UPS1C INPUT", "UPS1C OUPUT", 5],
        ["UPS1D INPUT", "UPS1D OUPUT", 5],

        ["UPS1C OUPUT", "2500A FP ACB 1600KVAR UPS-1", 5],
        ["UPS1D OUPUT", "2500A FP ACB 1600KVAR UPS-1", 5],

        ["UPS1A OUPUT", "2500A FP ACB 1600KVAR UPS-1", 5],
        ["UPS1B OUPUT", "2500A FP ACB 1600KVAR UPS-1", 5],

        ["2500A FP ACB 1600KVAR UPS-1", "UPS-1 LT PANEL", 20],

        ["UPS-1 LT PANEL", "Batch Tex3 N600 Combi 19,8m-1", 3],
        ["UPS-1 LT PANEL", "Batch Tex3 N600 Combi 19,8m-2", 3],
        ["UPS-1 LT PANEL", "Alkaline Polish-1", 3],
        ["UPS-1 LT PANEL", "Alkaline Polish-2", 3],
        ["UPS-1 LT PANEL", "Batch Tex3 N600 Combi 19,8m-2", 4],
        ["UPS-1 LT PANEL", "MCB-INCOMER", 4],

        // ["Plant", "Packaging", 934],
        // ["Plant", "Brewing", 68],
        // ["Plant", "Packaging", 934],
        // ["Plant", "Brewing", 68],
        // ["Plant", "Packaging", 934],
        // ... (more data)
      ],
      type: "sankey",
      name: "Energy Flow",
    },
  ],
};

const MySankeyChart = () => (
  <HighchartsReact highcharts={Highcharts} options={options} />
);

export default MySankeyChart;
