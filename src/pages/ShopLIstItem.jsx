import React, { useState } from "react";

export const ShopListItem = (props) => {
  const [value, setValue] = useState(props.children.isDone);
  const [quantity, setQuantity] = useState(props.children.quantity);

  const changeHandler = (e) => {
    setValue(e.target.checked);
    props.children.isDone = e.target.checked;
  };

  const removeHandler = () => {
    props.onRemove(props.value);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const style = value ? "line-through" : "none";

  return (
    <div className="tile-content">
      <li data-id={props.value} key={props.value} draggable="true">
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
        <div>
          <button onClick={incrementQuantity}>+</button>
          <span>{quantity}</span>
          <button onClick={decrementQuantity}>-</button>
        </div>
      </li>
    </div>
  );
};

export default ShopListItem;
