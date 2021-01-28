import React, { createContext, useReducer } from "react";
import data from "../data/data";
import AppReducer from "./AppReducer";

//Initial State
const initialState = data;

//Global Context
export const GlobalContext = createContext(initialState);

//Global Provider
const GlobalProvider = ({ children }) => {
  //Actions
  const addToCart = (data) => {
    dispatch({
      type: "ADD_CART",
      payload: data,
    });
  };

  const removeFromCart = (id) => {
    dispatch({
      type: "DELETE_CART",
      payload: id,
    });
  };

  const addProduct = (data) => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: data,
    });
  };

  const editProduct = (data) => {
    dispatch({
      type: "EDIT_PRODUCT",
      payload: data,
    });
  };

  const deleteProduct = (data) => {
    dispatch({
      type: "DELETE_PRODUCT",
      payload: { item_id: data },
    });
  };

  //Maintaing State
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        items: state.items,
        cart: state.cart,
        addToCart,
        addProduct,
        editProduct,
        deleteProduct,
        removeFromCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
