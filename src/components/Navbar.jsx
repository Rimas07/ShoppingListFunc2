// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">{t("shoppingLists")}</Link>
        </li>
        <li>
          <Link to="/products">{t("products")}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
