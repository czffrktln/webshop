import { PuzzleType } from "../types";

export const filterPuzzles = (puzzleList: PuzzleType[] , searchValue: string) => {
  return puzzleList.filter(
    (currentPuzzle) =>
      currentPuzzle.title
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      currentPuzzle.brand
        .toLowerCase()
        .includes(searchValue.toLowerCase())
  );
}