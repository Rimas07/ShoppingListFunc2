import axios from "axios";

const API_URL = "http://localhost:3500/Shop";

export const fetchLists = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching shopping lists:", error);
    throw error;
  }
};

export const fetchListItems = async (listId) => {
  try {
    const response = await axios.get(`${API_URL}/${listId}`);
    return response.data.items;
  } catch (error) {
    console.error("Error fetching shop items:", error);
    throw error;
  }
};

export const updateQuantity = async (listId, itemId, newQuantity) => {
  try {
    const response = await axios.patch(`${API_URL}/Shop/${listId}`, {
      itemId,
      newQuantity,
    });
    return response.data.items;
  } catch (error) {
    console.error("Error updating item quantity:", error);
    throw error;
  }
};
export const createList = async (listData) => {
  try {
    const response = await axios.post(API_URL, listData);
    return response.data;
  } catch (error) {
    console.error("Error creating shopping list:", error);
    throw error;
  }
};

export const deleteShoppingList = async (listId) => {
  try {
    await axios.delete(`${API_URL}/${listId}`);
  } catch (error) {
    console.error("Error deleting shopping list:", error);
    throw error;
  }
};

export const deleteItemFromList = async (listId, itemId) => {
  try {
    await axios.delete(`${API_URL}/${listId}/items/${itemId}`);
  } catch (error) {
    console.error("Error deleting item from list:", error);
    throw error;
  }
};
