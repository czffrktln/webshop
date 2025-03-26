import { CurrentCartType } from "../types";

export async function writeCurrentCart(currentCart: CurrentCartType) {
  const response = await fetch("http://localhost:3000/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentCart),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
}

export async function getCartBySesionId(sessionId: string) {
  const response = await fetch(`http://localhost:3000/cart/${sessionId}`);
  if (!response.ok) {
    throw new Error(`An error occured: ${response.status}`);
  }
  return await response.json();
}
