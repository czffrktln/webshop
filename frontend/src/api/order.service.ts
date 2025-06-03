import { CartType } from "../types";

export async function sendOrder(cart: CartType) {
  const response = await fetch("http://localhost:3000/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
}

export async function getOrdersByUser(id: string) {
  console.log("getOrdersByUser func id", id, new Date());
  
  const response = await fetch(`http://localhost:3000/order/${id}`)
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
}
