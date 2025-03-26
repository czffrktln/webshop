import { createContext, useEffect, useState } from "react";
import { CartItemType, CurrentCartType, PuzzleType } from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCartBySesionId, writeCurrentCart } from "../api/cart.service";
import { checkCookie, getCookie } from "../utils/cookies";

interface CartContextType {
  cart: CartItemType[] | [];
  setCart: (item: CartItemType[]) => void;
  addToCart: (item: PuzzleType) => void;
  decreaseAmount: (item: CartItemType) => void;
  increaseAmount: (item: CartItemType) => void;
  removeItem: (id: string) => void;
  numberOfItems: number | null;
  total: number;
}

const defaultState: CartContextType = {
  cart: [],
  setCart: () => {},
  addToCart: () => [],
  decreaseAmount: () => [],
  increaseAmount: () => [],
  removeItem: () => [],
  numberOfItems: null,
  total: 0,
};

export const CartContext = createContext(defaultState);

type CartProviderProps = {
  children: React.ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const savedCart = sessionStorage.getItem("cart");

  const sessionId = checkCookie();

  const { data: currentCart } = useQuery<CurrentCartType>({
    queryKey: ["cart", sessionId],
    queryFn: () => getCartBySesionId(sessionId),
  });

  console.log("currentCart", currentCart);

  const [cart, setCart] = useState<CartItemType[] | []>(
    savedCart ? JSON.parse(savedCart) : []
  );
  const [numberOfItems, setNumberOfItems] = useState<number | null>(null);
  const [total, setTotal] = useState<number>(0);

  console.log("cart", cart);

  const onCartMutation = useMutation({
    mutationFn: (currentCart: CurrentCartType) => writeCurrentCart(currentCart),
    onSuccess: (response) => console.log(response),
  });

  useEffect(() => {
    if (cart.length !== 0) {
      onCartMutation.mutate({
        session_id: getCookie("sessionId"),
        puzzles: cart.map((item) => ({
          puzzle_id: item.puzzle._id,
          quantity: item.quantity,
        })),
      });
    }

    const totalCartItems = cart.reduce<number>((acc, currentValue) => {
      acc += currentValue.quantity;
      return acc;
    }, 0);
    setNumberOfItems(totalCartItems);
    sessionStorage.setItem("cart", JSON.stringify(cart));

    const totalAmount = cart.reduce<number>((acc, currentValue) => {
      acc += Number(currentValue.puzzle.price) * currentValue.quantity;
      return acc;
    }, 0);
    setTotal(totalAmount);
  }, [cart]);

  const addToCart = (puzzle: PuzzleType) => {
    checkCookie();
    const puzzleIndex = cart.findIndex(
      (item) => item.puzzle._id === puzzle._id
    );

    if (puzzleIndex === -1) {
      setCart([...cart, { puzzle, quantity: 1 }]);
    } else {
      const newCart = [...cart];
      newCart[puzzleIndex] = {
        ...newCart[puzzleIndex],
        quantity: newCart[puzzleIndex].quantity + 1,
      };
      setCart(newCart);
    }
  };

  const decreaseAmount = (cartItem: CartItemType) => {
    const puzzleIndex = cart.findIndex(
      (item) => item.puzzle._id === cartItem.puzzle._id
    );

    if (puzzleIndex === -1) {
      return;
    } else if (cartItem.quantity === 1) {
      removeItem(cartItem.puzzle._id);
    } else {
      const newCart = [...cart];
      newCart[puzzleIndex] = {
        ...newCart[puzzleIndex],
        quantity: newCart[puzzleIndex].quantity - 1,
      };
      setCart(newCart);
    }
  };

  const increaseAmount = (cartItem: CartItemType) => {
    const puzzleIndex = cart.findIndex(
      (item) => item.puzzle._id === cartItem.puzzle._id
    );

    if (puzzleIndex === -1) {
      return;
    } else {
      const newCart = [...cart];
      newCart[puzzleIndex] = {
        ...newCart[puzzleIndex],
        quantity: newCart[puzzleIndex].quantity + 1,
      };
      setCart(newCart);
    }
  };

  const removeItem = (id: string) => {
    const newCart = cart.filter((puzzle) => puzzle.puzzle._id !== id);
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
        increaseAmount,
        removeItem,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
