import { createContext, Dispatch, SetStateAction, useState } from "react";

import { PuzzleType } from "../types";

interface PuzzleContextType {
  puzzleList: PuzzleType[];
  setPuzzleList: Dispatch<SetStateAction<PuzzleType[]>>;
}

export const PuzzleContext = createContext<PuzzleContextType>();

export function PuzzleProvider({ children }) {
  const [puzzleList, setPuzzleList] = useState<PuzzleType[]>([]);

  return (
    <PuzzleContext.Provider value={{ puzzleList, setPuzzleList }}>
      {children}
    </PuzzleContext.Provider>
  );
}
