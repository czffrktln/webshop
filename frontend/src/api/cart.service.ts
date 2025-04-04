import { CartType } from "../types";

export async function writeCurrentCart(currentCart: CartType) {
  console.log("writecurrentcart fut");
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
  console.log("getcartbysessionid fut");
  const response = await fetch(`http://localhost:3000/cart/${sessionId}`);
  if (!response.ok) {
    throw new Error(`An error occured: ${response.status}`);
  }
  return await response.json();
}
