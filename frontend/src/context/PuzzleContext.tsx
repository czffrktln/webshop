import { createContext, useState } from "react";

import { PuzzleType } from "../types";

interface PuzzleContextType {
  puzzleList: PuzzleType[] | [];
  setPuzzleList: (puzzleList: PuzzleType[] | []) => void;
}

const defaultState: PuzzleContextType = {
  puzzleList: [],
  setPuzzleList: () => {},
};

export const PuzzleContext = createContext(defaultState);

type PuzzleProviderProps = {
  children: React.ReactNode;
};

export function PuzzleProvider({ children }: PuzzleProviderProps) {
  const [puzzleList, setPuzzleList] = useState<PuzzleType[]>([]);

  return (
    <PuzzleContext.Provider value={{ puzzleList, setPuzzleList }}>
      {children}
    </PuzzleContext.Provider>
  );
}
