import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CartContext } from "../main";

const ProductCardContainer = styled.div`
  border: 1px solid black;
  display: flex;
  height: 200px;
  padding: 12px;

  & img {
    object-fit: scale-down;
  }

  & ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    list-style: none;
  }

  & input[type="submit"] {
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
`;

function ProductCard({
  productItem,
  onQuantityChange,
  addToCart,
  animation,
  animationIndex,
}) {
  const [quantity, setQuantity] = useState(1);
  const { cartIsOpen } = useContext(CartContext);

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
  };

  return (
    <ProductCardContainer>
      <img src={productItem.image} />
      <ul>
        <li>{productItem.title}</li>
        <li>{productItem.description}</li>
        <li>{productItem.price} HUF</li>
        <li>
          <form>
            <label htmlFor="quantity">Quantity: </label>
            <input
              type="number"
              name="quantity"
              value={quantity}
              min={1}
              max={99}
              onChange={handleQuantityChange}
            />
            <input
              type="submit"
              value="Add to cart"
              onClick={(e) => {
                e.preventDefault();
                addToCart(productItem, Number(quantity));
              }}
            />
          </form>
        </li>
      </ul>
    </ProductCardContainer>
  );
}

export default ProductCard;
