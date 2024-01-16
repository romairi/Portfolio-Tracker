import { ResponsiveBar } from "@nivo/bar";

import "./index.scss";

export const BarChart = ({ data, colors = { scheme: "paired" } }) => {
  return (
    <div className="bar-chart">
      <ResponsiveBar
        data={data}
        indexBy="id"
        margin={{ top: 20, right: 220, bottom: 70, left: 70 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={colors}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 15,
          tickRotation: 0,
          legend: "Name Stock",
          legendPosition: "middle",
          legendOffset: 50,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 0,
          tickRotation: 0,
          legend: "Return NFS",
          legendPosition: "middle",
          legendOffset: -60,
        }}
        enableGridX={false}
        enableGridY={true}
        enableLabel={true}
        labelSkipWidth={12}
        labelSkipHeight={0}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 30]],
        }}
        role="application"
      />
    </div>
  );
};
