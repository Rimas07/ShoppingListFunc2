import React, { useState } from "react";

export const ShopListItem = (props) => {
  const [value, setValue] = useState(props.children.isDone);

  const changeHandler = (e) => {
    setValue(e.target.checked);
    props.children.isDone = e.target.checked;
  };

  const removeHandler = () => {
    props.onRemove(props.value);
  };

  

  const style = value ? "line-through" : "none";

  return (
    <div className="tile-content">
      <li
        data-id={props.value}
        key={props.value}
        draggable="true"
      
      >
        <button
          type="button"
          className="close pull-right"
          aria-hidden="true"
          onClick={removeHandler}
        >
          &times;
        </button>
        <input
          type="checkbox"
          onChange={changeHandler}
          defaultChecked={props.children.isDone}
        />
        <span style={{ textDecoration: style }}>{props.children.item}</span>
      </li>
    </div>
  );
};

export default ShopListItem;
