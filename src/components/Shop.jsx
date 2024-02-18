import { useParams } from "react-router";
import { useCallback, useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import ProductCard from "./ProductCard";
import Items from "../assets/sampleItems.json";
import { CartContext } from "../main";

const showCart = keyframes`
  from {
    transform: scaleY(0);
    opacity: 10%;
  }

  to {
    transform: scaleY(100%);
    opacity: 100%;
  }
`;

const showProduct = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const FancyButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 12px;
  font-size: 1.2rem;
  padding: 4px;
  border-radius: 4px;
  align-self: flex-end;
  background-color: #929a68;
  box-shadow: 0.2rem 0.2rem black, -0.2rem -0.2rem #ccc;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: black;
    color: rgb(231, 239, 235);
  }
`;

const ProductsView = styled.div`
  display: grid;
  grid-template: 1fr / 1fr;
  gap: 12px;

  padding: 24px;
`;

const CartContainer = styled.div`
  border: 1px solid #cceecd;
  position: fixed;
  right: 12px;
  bottom: 12px;
  width: 200px;
  height: 240px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: #aeb3b8;
  font-size: 1.2rem;

  animation: ${showCart} 0.2s forwards ease-in-out;

  & ul {
    list-style: none;
  }

  & button {
    font-size: 1.2rem;
    padding: 2px;
    border-radius: 4px;
    align-self: flex-end;
    background-color: #929a68;
    box-shadow: 0.2rem 0.2rem black, -0.2rem -0.2rem #ccc;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: black;
      color: rgb(231, 239, 235);
    }
  }

  & .hideBtn {
    padding: 0px;
  }

  & p {
    flex-grow: 1;
  }
`;

function ShoppingCart({ items, removeItem }) {
  const [total, setTotal] = useState(0);
  const { cartIsOpen, setCartIsOpen } = useContext(CartContext);

  useEffect(() => {
    const newTotal = items.reduce((total, current) => {
      return (total += current.item.price * current.quantity);
    }, 0);
    setTotal(newTotal);
  }, [items]);

  const toggleCartOpened = () => {
    cartIsOpen === false ? setCartIsOpen(true) : setCartIsOpen(false);
  };

  if (!cartIsOpen)
    return <FancyButton onClick={toggleCartOpened}>Show cart</FancyButton>;

  return (
    <CartContainer>
      <h3>Cart:</h3>
      <ul>
        {items.map((product, index) => {
          return (
            <li key={product.item.id}>
              {index + 1}. {product.item.title} x {product.quantity}
            </li>
          );
        })}
      </ul>
      <button>Checkout</button>
      <p>TOTAL: {total} </p>
      <button className="hideBtn" onClick={toggleCartOpened}>
        Hide cart
      </button>
    </CartContainer>
  );
}

function Shop({ images }) {
  const { cart, setCart, addToCart } = useContext(CartContext);
  const { categoryFilter, setCategoryFilter } = useContext(CartContext);
  const { products, setProducts } = useContext(CartContext);
  const { getFilteredProducts } = useContext(CartContext);

  const categoryQuery = useParams().category || "all";

  useEffect(() => {
    setCategoryFilter(categoryQuery);

    return () => {
      setCategoryFilter("all");
    };
  }, [categoryQuery]);

  // const [categoryFilter, setCategoryFilter] = useState("all");
  // const [products, setProducts] = useState(Items);
  // const [cart, setCart] = useState([]);

  // const categoryQuery = useParams().category || "all";

  // useEffect(() => {
  //   setCategoryFilter(categoryQuery);

  //   return () => {
  //     setCategoryFilter("all");
  //   };
  // }, [categoryQuery]);

  // const getFilteredProducts = (category) => {
  //   if (category === "all") {
  //     return products;
  //   } else {
  //     return products.filter((product) => product.category === category);
  //   }
  // };

  const filteredProducts = getFilteredProducts(categoryFilter);

  // const addToCart = (item, quantity) => {
  //   const existingItem = cart.find((product) => product.item.id === item.id);
  //   const newCart = [...cart];
  //   if (existingItem) {
  //     newCart[cart.indexOf(existingItem)].quantity += quantity;
  //     setCart(newCart);
  //   } else {
  //     newCart.push({ item: item, quantity: quantity });
  //     setCart(newCart);
  //   }
  // };

  return (
    <>
      <h1>ALL {categoryFilter}</h1>
      <ShoppingCart items={cart}></ShoppingCart>
      <ProductsView>
        {filteredProducts.map((product, index) => {
          return (
            <ProductCard
              animation={showProduct}
              animationIndex={index}
              key={product.id}
              productItem={product}
              addToCart={addToCart}
            />
          );
        })}
      </ProductsView>
    </>
  );
}

export default Shop;
