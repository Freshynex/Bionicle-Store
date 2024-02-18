import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./components/Router";
import Items from "./assets/sampleItems.json";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
export const CartContext = React.createContext();

function Main() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [products, setProducts] = useState(Items);
  const [cart, setCart] = useState([]);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const getFilteredProducts = (category) => {
    if (category === "all") {
      return products;
    } else {
      return products.filter((product) => product.category === category);
    }
  };

  console.log(cartIsOpen);
  const filteredProducts = getFilteredProducts(categoryFilter);

  const addToCart = (item, quantity) => {
    const existingItem = cart.find((product) => product.item.id === item.id);
    if (!cartIsOpen) setCartIsOpen(true);
    const newCart = [...cart];
    if (existingItem) {
      newCart[cart.indexOf(existingItem)] = { item, quantity };
      setCart(newCart);
    } else {
      newCart.push({ item: item, quantity: quantity });
      setCart(newCart);
    }
    // if (!cartIsOpen) setCartIsOpen(true);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartIsOpen,
        setCartIsOpen,
        addToCart,
        categoryFilter,
        setCategoryFilter,
        products,
        getFilteredProducts,
        setProducts,
        quantity,
        setQuantity,
      }}
    >
      <Router />
    </CartContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
