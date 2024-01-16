import { useState } from "react";
import _ from "lodash";

export const usePurchaseItems = () => {
  const [purchaseItemsProperties, setPurchaseItemsProperties] = useState({});

  const handlePriceChange = (purchaseId, newPrice) => {
    setPurchaseItemsProperties({
      ...purchaseItemsProperties,
      [purchaseId]: {
        ...purchaseItemsProperties[purchaseId],
        purchase_price: newPrice,
      },
    });
  };

  const handleQuantityChange = (purchaseId, newQuantity) => {
    setPurchaseItemsProperties({
      ...purchaseItemsProperties,
      [purchaseId]: {
        ...purchaseItemsProperties[purchaseId],
        quantity: newQuantity,
      },
    });
  };

  const handleDateChange = (purchaseId, newDate) => {
    setPurchaseItemsProperties({
      ...purchaseItemsProperties,
      [purchaseId]: {
        ...purchaseItemsProperties[purchaseId],
        date: newDate,
      },
    });
  };

  const generateInitialProperties = () => {
    return {
      quantity: 0,
      purchase_price: 0,
      date: new Date(),
      purchase_currency: "",
      origin_currency: "USA",
      exchange: 0,
    };
  };

  const removePurchaseItem = (purchaseId) => {
    setPurchaseItemsProperties((prevPurchaseItems) => {
      return _.omit(prevPurchaseItems, purchaseId);
    });
  };

  const addPurchaseItem = () => {
    const id = _.uniqueId();
    const itemsProperties = generateInitialProperties();

    setPurchaseItemsProperties({
      ...purchaseItemsProperties,
      [id]: itemsProperties,
    });
  };

  const clearAllPurchaseItems = () => {
    setPurchaseItemsProperties({});
  };

  return {
    purchaseItemsProperties,
    handlePriceChange,
    handleDateChange,
    handleQuantityChange,
    removePurchaseItem,
    addPurchaseItem,
    clearAllPurchaseItems,
  };
};
