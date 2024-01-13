
import React, { useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { GoTrash } from "react-icons/go";
import EditList from "../components/EditList";
import QuantityChartSection from "./QuantityChartSection";

export const ShopCatalog = (props) => {
  const [selectedCharts, setSelectedCharts] = useState({});
  const [quantityChartVisible, setQuantityChartVisible] = useState(false);

  const toggleQuantityChart = () => {
    setQuantityChartVisible(!quantityChartVisible);
  };

  const changeTodo = (e) => {
    const selectedId = e.currentTarget.dataset.id;
    props.onSelected(selectedId);
  };

  const checkActive = (i) => {
    return i === props.selectedID ? "list-group-item active" : "list-group-item";
  };

  const handleDelete = (index) => {
    props.onDeleteShop(index);
  };

  const handleChangeChart = (event, selectedId) => {
    setSelectedCharts({
      ...selectedCharts,
      [selectedId]: event.target.value,
    });
  };

  return (
    <Grid container spacing={2}>
      {props.Todos.map(function (item, i) {
        let _class = checkActive(i);

        return (
          <Grid item xs={12} sm={6} md={5} lg={3} key={i}>
            <Paper
              elevation={3}
              className={_class}
              style={{
                padding: "15px",
                cursor: "pointer",
                backgroundColor: i === props.selectedID ? "#5bc0de" : "inherit",
                color: i === props.selectedID ? "#fff" : "inherit",
              }}
              onClick={changeTodo}
              data-id={i}
            >
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2">
                <span className="badge">{item.items.length}</span> {("items")}
              </Typography>

              <EditList onUpdateListName={props.onUpdateListName} />

              <button
                className="btn btn-danger"
                onClick={() => handleDelete(i)}
              >
                <GoTrash />
              </button>

              <Select
                value={selectedCharts[i] || "allItems"}
                onChange={(e) => handleChangeChart(e, i)}
                displayEmpty
              >
                <MenuItem value="allItems">All </MenuItem>
                <MenuItem value="doneItems">Done </MenuItem>
                <MenuItem value="undoneItems">Undone </MenuItem>
             
              </Select>

              {selectedCharts[i] && (
                <QuantityChartSection
                  selectedStore={props.Todos[i]}
                  selectedChart={selectedCharts[i]}
                />
              )}
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ShopCatalog;
