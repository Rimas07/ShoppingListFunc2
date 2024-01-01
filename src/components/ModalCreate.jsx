// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "../css/Modal.css";
// import useResponsive from "../hooks/useResponsive";
import { useTranslation } from 'react-i18next'

export const ModalW = ({ closeModal, onSubmit, inputValue, onInputChange }) => {
  const [formState, setFormState] = useState({
    name: inputValue || "",
  });
  const { t } = useTranslation();
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.name.trim()) {
      setErrors("");
      return true;
    } else {
      setErrors("Name cannot be empty");
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
    onInputChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);
    closeModal();
  };
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="Modal">
        <form>
          <div className="form-group">
            <label htmlFor="name">{t('Name')}</label>
            <input name="name" value={formState.name} onChange={handleChange} />
            <div className="error">{errors}</div>
          </div>

          <button type="submit" className="btn" onClick={handleSubmit}>
            {t('Add')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalW;
