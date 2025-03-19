export async function getAllPuzzles() {
  console.log("puzzle query fut");
  
  const response = await fetch("http://localhost:3000/puzzle");
  return await response.json();
}