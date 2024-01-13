
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

export const ShopProducts = (props) => {
  const [item, setItem] = useState("");
  const itemRef = useRef(null);
  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onFormSubmit(item);
    setItem("");
    itemRef.current.focus();
    return;
  };

  const onChange = (e) => {
    setItem(e.target.value);
  };

  return (
    <div className="row">
      <form onSubmit={handleSubmit}>
        <div className="form-group col-sm-10">
          {" "}
          {t("Please add products")}
          <input
            type="text"
            className="todoField form-control"
            ref={itemRef}
            onChange={onChange}
            value={item}
          />
          <input
            type="submit"
            className="btn btn-default"
            style={{ float: "left", marginLeft: "5px" }}
            value={t("Add")}
          />
        </div>
      </form>
    </div>
  );
};

export default ShopProducts;
