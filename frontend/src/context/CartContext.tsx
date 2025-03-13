import { createContext, useEffect, useState } from "react";
import { CartItemType } from "../types";

interface CartContextType {
  cart: CartItemType[] | [];
  setCart: (item: CartItemType[]) => void;
  addToCart: (item: CartItemType) => void;
  decreaseAmount: (item: CartItemType) => void;
  removeItem: (id: string) => void;
  numberOfItems: number | null;
}

const defaultState: CartContextType = {
  cart: [],
  setCart: () => {},
  addToCart: () => [],
  decreaseAmount: () => [],
  removeItem: () => [],
  numberOfItems: null,
};

export const CartContext = createContext(defaultState);

type CartProviderProps = {
  children: React.ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const savedCart = sessionStorage.getItem("cart");

  const [cart, setCart] = useState<CartItemType[] | []>(
    savedCart ? JSON.parse(savedCart) : []
  );
  const [numberOfItems, setNumberOfItems] = useState<number | null>(null);

  useEffect(() => {
    const totalCartItems = cart.reduce<number>((acc, currentValue) => {
      if (typeof currentValue.quantity !== "undefined") {
        acc += currentValue.quantity;
      }
      return acc;
    }, 0);
    setNumberOfItems(totalCartItems);
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (puzzle: CartItemType) => {
    const puzzleIndex = cart.findIndex((item) => item._id === puzzle._id);

    if (puzzleIndex === -1) {
      setCart([...cart, { ...puzzle, quantity: 1 }]);
    } else {
      const newCart = [...cart];
      if (typeof newCart[puzzleIndex].quantity !== "undefined") {
        newCart[puzzleIndex] = {
          ...newCart[puzzleIndex],
          quantity: newCart[puzzleIndex].quantity + 1,
        };
        setCart(newCart);
      }
    }
  };

  const decreaseAmount = (puzzle: CartItemType) => {
    const puzzleIndex = cart.findIndex((item) => item._id === puzzle._id);

    if (puzzleIndex === -1) {
      return;
    } else if (puzzle.quantity === 1) {
      removeItem(puzzle._id);
    } else {
      const newCart = [...cart];
      if (typeof newCart[puzzleIndex].quantity !== "undefined") {
        newCart[puzzleIndex] = {
          ...newCart[puzzleIndex],
          quantity: newCart[puzzleIndex].quantity - 1,
        };
        setCart(newCart);
      }
    }
  };

  const removeItem = (id: string) => {
    const newCart = cart.filter((puzzle) => puzzle._id !== id);
    setCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        numberOfItems,
        decreaseAmount,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
