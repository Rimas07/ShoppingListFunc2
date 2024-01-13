import React, { useState } from "react";
import { PieChart, Pie, Tooltip, Legend } from "recharts";
import { Button, Grid, Paper } from "@mui/material";

const QuantityChart = ({ items }) => {
  const [quantityChartVisible, setQuantityChartVisible] = useState(false);

  const toggleQuantityChart = () => {
    setQuantityChartVisible(!quantityChartVisible);
  };

  const data = items.map((item) => ({
    name: item.item,
    value: item.quantity,
  }));

  const quantityChart = (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        nameKey="name"
        label
      />
      <Tooltip />
      <Legend />
    </PieChart>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleQuantityChart}
          >
            {quantityChartVisible
              ? "Hide Quantity Chart"
              : "Show Quantity Chart"}
          </Button>

          {quantityChartVisible && quantityChart}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default QuantityChart;
