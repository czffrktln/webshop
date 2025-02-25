import { createContext, useState } from "react";
import { CartItemType } from "../types";

interface CartContextType {
  cart: CartItemType[] | [],
  setCart: (item: CartItemType[]) => void,
  addToCart: (item: CartItemType) => void
}

const defaultState: CartContextType = {
  cart: [],
  setCart: () => {},
  addToCart: () => []
}

export const CartContext = createContext(defaultState)

type CartProviderProps = {
  children: React.ReactNode
}

export function CartProvider({children}: CartProviderProps) {

  const [ cart, setCart ] = useState<CartItemType[] | []>([])
  console.log("cart", cart);

  const addToCart = (puzzle: CartItemType) => {
    const puzzleIndex = cart.findIndex((item) => item._id === puzzle._id)

    if (puzzleIndex === -1) {
      setCart([...cart, {...puzzle, quantity: 1}])
    } else {
      const newCart = [...cart]
      if (typeof newCart[puzzleIndex].quantity !== "undefined") {
        newCart[puzzleIndex] = {...newCart[puzzleIndex], quantity: newCart[puzzleIndex].quantity + 1}
        setCart(newCart)

      }
    }
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  )

}