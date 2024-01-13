import React, { useState, useEffect } from "react";
import ShopCatalogForm from "./ShopCatalogForm";
import ShopCatalog from "./ShopCatalog";
import ShopProducts from "./ShopProducts";
import ShopList from "./ShopList";
import "../css/ShopApp.css";
import { useTranslation, I18nextProvider } from "react-i18next";
import ModalDelete from "../components/ModalDelete";
import useResponsive from "../hooks/useResponsive";
import i18n from "../i18n";
import LanguageSwitcher from "../components/LanguageSwitcher";

import {
  fetchLists,
  fetchListItems,
  createList,
  deleteShoppingList,
} from "../components/ShopApi";
import { Route, BrowserRouter as Router } from "react-router-dom";

const ShopApp = () => {
  const [shopState, setShopState] = useState({
    
    Shop: [{ items: [] }],
    filter: [{ keyword: "", Status: "SHOW_ALL" }],
    selectedCatelog: "0",
    isModalOpen: false,
    isDeleteModalOpen: false,
    shopToDelete: null,
  });
 const { t } = useTranslation();
  const [deleteId, setDeleteId] = useState();
  const [show, setShow] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const { windowWidth, screenType } = useResponsive();
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  useEffect(() => {
    const fetchShoppingLists = async () => {
      try {
        const lists = await fetchLists();
        setShopState({ ...shopState, Shop: lists });
      } catch (error) {
        console.error("Error fetching shopping lists:", error);
      }
    };

    fetchShoppingLists();
  }, []);

  useEffect(() => {
    const fetchItemsForSelectedShop = async () => {
      if (shopState.selectedCatelog !== null) {
        try {
          const shopId = shopState.Shop[shopState.selectedCatelog].id;
          const items = await fetchListItems(shopId);
          console.log("Fetched items:", items);
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      }
    };

    fetchItemsForSelectedShop();
  }, [shopState.selectedCatelog]);
  const chartSizes = () => {
    if (screenType === "DESKTOP") {
      return {
        width: 1200,
        height: 500,
      };
    } else if (screenType === "TABLET") {
      return {
        width: windowWidth * 0.8,
        height: 400,
      };
    } else if (screenType === "MOBILE") {
      return {
        width: windowWidth * 0.8,
        height: 300,
      };
    } else {
      return {
        width: 0,
        height: 0,
      };
    }
  };
  const updateItems = (newItem) => {
    let item = { item: newItem, isDone: false };
    let newtodo = shopState.Shop;
    let allItems = shopState.Shop[shopState.selectedCatelog].items.concat([
      item,
    ]);
    newtodo[shopState.selectedCatelog].items = allItems;
    setShopState({
      ...shopState,
      Shop: newtodo,
    });
  };
  const deleteItem = (index) => {
    let newtodo = shopState.Shop;
    let allItems = shopState.Shop[shopState.selectedCatelog].items.slice();
    allItems.splice(index, 1);
    newtodo[shopState.selectedCatelog].items = allItems;
    setShopState({
      ...shopState,
      Shop: newtodo,
    });
  };
  const addCatalog = async (newCatalog) => {
    try {
      const newList = await createList({ name: newCatalog, items: [] });
      setShopState({
        ...shopState,
        Shop: [...shopState.Shop, newList],
      });
    } catch (error) {
      console.error("Error creating shopping list:", error);
    }
  };

  const setSelectedCatalog = (index) => {
    shopState.selectedCatelog = index;
    setShopState({
      ...shopState,
      selectedCatelog: index,
    });

   
    const shopId = shopState.Shop[index].id;
    fetchListItems(shopId);
  };
  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const updateListName = (newListName) => {
    setShopState((prevState) => {
      const updatedShop = [...prevState.Shop];
      updatedShop[prevState.selectedCatelog].name = newListName;
      return { ...prevState, Shop: updatedShop };
    });
  };
  const handleClickDeleteShop = (index) => {
    setDeleteId(index);
    setShow(true);
    console.log(index);
    setDialog({
      message: t("deleteList"),
      isLoading: true,
    });
  };
  const handleDeleteShop = async () => {
    try {
      const listIdToDelete = shopState.Shop[deleteId].id;
      await deleteShoppingList(listIdToDelete);

      setShopState((prevState) => {
        const newShop = [...prevState.Shop];
        const filteredShop = newShop.filter(
          (item, index) => index !== deleteId
        );
        return { ...prevState, Shop: filteredShop };
      });
    } catch (error) {
      console.error("Error deleting shopping list:", error);
    } finally {
      setShow(false);
    }
  };

  return (
   
    <I18nextProvider i18n={i18n}>
      
      <div className="row">
        <h1>{t("shoppingLists")}</h1>
        <h1>{screenType}</h1>
        <div className="col-xs-3">
          <div>
            <LanguageSwitcher />
          </div>

          <ShopCatalogForm
            width={chartSizes().width}
            height={chartSizes().height}
            onFormSubmit={addCatalog}
          />
          <ShopCatalog
            width={chartSizes().width}
            height={chartSizes().height}
            selectedID={shopState.selectedCatelog}
            onSelected={(index) => {
              setSelectedCatalog(index);
              setSelectedStore(index);
            }}
            Todos={shopState.Shop}
            onDeleteShop={handleClickDeleteShop}
            onUpdateListName={updateListName}
          />

          <div>
            <div>
              {dialog.isLoading && (
                <ModalDelete
                  width={chartSizes().width}
                  height={chartSizes().height}
                  onDeleteShop={(confirmed) => {
                    setDialog({
                      message: "",
                      isLoading: false,
                    });
                    if (confirmed) {
                      handleDeleteShop();
                    }
                  }}
                  message={dialog.message}
                />
              )}
            </div>
          </div>
        </div>
        <div className="col-xs-6">
          {selectedStore !== null && shopState.Shop[selectedStore] && (
            <>
              <ShopProducts
                width={chartSizes().width}
                height={chartSizes().height}
                onFormSubmit={updateItems}
              />
              <ShopList
                width={chartSizes().width}
                height={chartSizes().height}
                items={shopState.Shop[selectedStore].items || []}
                filter={shopState.filter}
                onDelete={deleteItem}
              />
                {/* <QuantityChartSection selectedStore={shopState.Shop[shopState.selectedCatelog]} /> */}
                
            </>
            )}
           
        </div>
      </div>
      </I18nextProvider>
     
  );
};

export default ShopApp;
