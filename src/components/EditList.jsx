import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useTranslation } from 'react-i18next';
function EditList({ onUpdateListName }) {
  const [listName, setListName] = useState("");
  const [newListName, setNewListName] = useState("");

  const editListName = () => {
    onUpdateListName(newListName);
    setNewListName("");
  };
 const { t } = useTranslation();
  return (
    <div>
      <h2>{listName}</h2>
      <input
        type="text"
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
          placeholder={t('Enter New List Name')}
      />
      <button onClick={editListName}><CiEdit /></button>
    </div>
  );
}

export default EditList;
