import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { PieChart } from "../PieChart";

import "./index.scss";

const StockCharts = ({
  diversificationByCompanyData,
  switchChart,
  pieData,
  barData,
  isCurChart,
}) => {
  return (
    <Box sx={{ flexGrow: 2 }}>
      <Grid container columns={16}>
        <Grid item={true} xs={8}>
          <Typography variant="h6" gutterBottom component="div" align="center">
            Diversification By Company
          </Typography>
          {<PieChart data={diversificationByCompanyData} />}
        </Grid>
        <Grid item={true} xs={8}>
          <Typography variant="h6" gutterBottom component="div" align="center">
            Contributors to Returns
          </Typography>
          {<PieChart data={pieData} colors={{ datum: "data.color" }} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default StockCharts;
