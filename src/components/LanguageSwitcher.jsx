
import React from 'react';
import { useTranslation } from 'react-i18next';


const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (

    <div className='lang'>
     <select onChange={(e) => changeLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="cz">Czech</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
