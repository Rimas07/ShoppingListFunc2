// ShopCatalogForm.js
import React, { useState } from "react";
import ModalCreate from "../components/ModalCreate"
import { useTranslation } from 'react-i18next';

 export const ShopCatalogForm = (props) => {
  const [item, setItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const handleInputChange = (e) => {
    setItem(e.target.value);
  };

  const handleeSubmit = () => {
    props.onFormSubmit(item);
    setItem("");
    closeAndResetModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeAndResetModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="row">
      <button className="btn btn-default" onClick={openModal}>
        {t('Add Shopping list')}
      </button>
      {isModalOpen && (
        <ModalCreate
          closeModal={closeAndResetModal}
          onSubmit={handleeSubmit}
          inputValue={item}
          onInputChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default ShopCatalogForm;
