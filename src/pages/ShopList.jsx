
import React, { useState } from "react";
import ShopListItem from "./ShopLIstItem";
import { Placeholder } from "react-bootstrap";

export const ShopList = (props) => {
  const [, setData] = useState(props.items);
  let dragged = null;
  let over = null;
  let nodePlacement = null;

  const remove = (e) => {
    props.onDelete(e);
  };

  const dragStart = (e) => {
    dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = "move";
  };

  const dragEnd = (e) => {
    dragged.style.display = "";
    let hasNode = false;

    Array.prototype.forEach.call(
      dragged.parentNode.childNodes,
      function (node) {
        if (node.className === "placeholder") hasNode = true;
      }
    );

    if (!hasNode) return;

    dragged.parentNode.removeChild(<Placeholder />);
    let updatedData = props.items;
    let from = Number(dragged.dataset.id);
    let to = Number(over.dataset.id);

    if (from < to) to--;

    if (nodePlacement === "after") to++;

    updatedData.splice(to, 0, updatedData.splice(from, 1)[0]);
    setData(updatedData);
  };

  const createItem = (itemText, i) => (
    <ShopListItem
      key={i}
      value={i}
      onDragEnd={dragEnd}
      onDragStart={dragStart}
      onRemove={remove}
    >
      {itemText}
    </ShopListItem>
  );
  let allItems = props.items;
  let status = props.filter[0].Status;

  // eslint-disable-next-line default-case
  switch (status) {
    case "false":
      allItems = allItems.filter((t) => !t.isDone);
      break;
    case "true":
      allItems = allItems.filter((t) => t.isDone);
  }

  let queryText = props.filter[0].keyword;

  if (queryText) {
    let queryResult = [];
    allItems.forEach(function (item) {
      if (item.item.toLowerCase().indexOf(queryText) !== -1)
        queryResult.push(item);
    });

    return (
      <div className="tile-container">
        {queryResult.map((item, index) => (
          <div key={index} className="tile">
            {createItem(item, index)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="tile-container">
      {allItems.map((item, index) => (
        <div key={index} className="tile">
          {createItem(item, index)}
        </div>
      ))}
    </div>
  );
};

export default ShopList;
