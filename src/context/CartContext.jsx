import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("pawcareCart");

      if (savedCart) {
        return JSON.parse(savedCart);
      }

      return [];
    } catch (error) {
      console.error("Error loading cart:", error);

      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("pawcareCart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        const newQuantity = Math.min(
          existingProduct.quantity + quantity,
          product.stockQuantity,
        );

        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: newQuantity,
                stockQuantity: product.stockQuantity,
              }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: Math.min(quantity, product.stockQuantity),
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = Math.min(quantity, item.stockQuantity);

            return {
              ...item,
              quantity: newQuantity,
            };
          }

          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
