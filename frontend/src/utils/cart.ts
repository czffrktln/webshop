import { CartItemType } from "../types";

export function getNumberOfItems(cart: CartItemType[]) {
  const numberOfItems = cart.reduce((acc, currentValue) => {
    acc += currentValue.quantity;
    return acc;
  }, 0);
  return numberOfItems;
};


export function getTotalAmount(cart: CartItemType[]) {
  const totalAmount = cart.reduce((acc, currentValue) => {
    acc += Number(currentValue.puzzle.price) * currentValue.quantity;
    return acc;
  }, 0);
  return totalAmount;
};