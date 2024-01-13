import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuantityChart from "../components/QuantityChart";
import { fetchListItems } from "../components/ShopApi";


const QuantityChartSection = ({ selectedStore, selectedChart }) => {
    const [allItems, setAllItems] = useState([]);
    

  useEffect(() => {
    const fetchItemsForSelectedShop = async () => {
      if (selectedStore !== null) {
        try {
          const shopId = selectedStore.id; 
          const items = await fetchListItems(shopId);
          setAllItems(items);
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      }
    };

    fetchItemsForSelectedShop();
  }, [selectedStore]);

  let filteredItems;

  switch (selectedChart) {
    case "all":
      filteredItems = allItems;
      break;
    case "doneItems":
      filteredItems = allItems.filter((item) => item.isDone);
      break;
    case "undoneItems":
      filteredItems = allItems.filter((item) => !item.isDone);
      break;
    default:
      filteredItems = allItems;
  }

  const chartGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  };

  return (
    <div style={chartGridStyle}>
      <div>
        <h1>{selectedChart === "all" ? "All Items" : ""}</h1>
        <Link to={`/chart/${selectedChart}`}>
          <QuantityChart items={filteredItems} />
        </Link>
      </div>

    </div>
  );
};

export default QuantityChartSection;
