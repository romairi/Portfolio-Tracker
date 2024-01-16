import { Button } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";

import "./index.scss";

const SwitchChartBtn = ({ switchChart, isPieChart }) => {
  return (
    <div className="switch-btn-chart">
      <Button
        className="switch-btn"
        variant="contained"
        color="primary"
        onClick={switchChart}
      >
        {isPieChart ? (
          <PieChartIcon className="chart-icon" />
        ) : (
          <BarChartIcon className="chart-icon" />
        )}
      </Button>
    </div>
  );
};

export default SwitchChartBtn;
