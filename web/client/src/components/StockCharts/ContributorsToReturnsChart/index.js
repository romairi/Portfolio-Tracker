import { BarChart } from "../../../components/BarChart";
import { PieChart } from "../../../components/PieChart";
import SwitchChartBtn from "../../SwitchChartBtn";

import "./index.scss";

const ContributorsToReturnsChart = ({
  switchChart,
  pieData,
  barData,
  isCurChart,
}) => {
  return (
    <div className="contributors-to-returns-chart">
      <SwitchChartBtn switchChart={switchChart} isPieChart={!isCurChart} />
      {isCurChart ? (
        <PieChart data={pieData} colors={{ datum: "data.color" }} />
      ) : (
        <BarChart data={barData} colors={{ datum: "data.color" }} />
      )}
    </div>
  );
};

export default ContributorsToReturnsChart;
