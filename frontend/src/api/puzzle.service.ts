export async function getAllPuzzles() {
  const response = await fetch("http://localhost:3000/puzzle");
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
}

export async function getCurrentPuzzle(id: string) {
  const response = await fetch(`http://localhost:3000/puzzle/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
}