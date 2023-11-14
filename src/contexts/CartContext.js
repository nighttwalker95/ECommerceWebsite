import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cartItems
      .reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount * currentItem.price;
      }, 0)
      .toFixed(2);
    setTotalPrice(total);
  }, [cartItems]);

  useEffect(() => {
    if (cartItems) {
      const amount = cartItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cartItems]);

  const addToCartHandler = (product, id) => {
    const newCartItem = { ...product, amount: 1 };
    const existingCartItemIndex = cartItems.findIndex((item) => item.id === id);
    const existingCartItem = cartItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, amount: existingCartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, newCartItem]);
    }
  };

  const removeFromCartHandler = (id) => {
    const newCart = cartItems.filter((item) => {
      return item.id !== id;
    });
    setCartItems(newCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseAmount = (id) => {
    const item = cartItems.find((item) => item.id === id);
    addToCartHandler(item, id);
  };

  const decreaseAmount = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      const newCart = cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount - 1 };
        } else {
          return item;
        }
      });
      setCartItems(newCart);
    }
    if (item.amount < 2) {
      removeFromCartHandler(id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCartHandler,
        removeFromCartHandler,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        totalPrice,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
