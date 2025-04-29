import { createContext, useState } from "react"
import { useSearchParams } from "react-router-dom";


interface SearchValueContextType {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const defaultState: SearchValueContextType = {
  searchValue: "",
  setSearchValue: (value) => value,
};

export const SearchValueContext = createContext(defaultState)

type SearchValueProviderProps = {
  children: React.ReactNode;
};

export function SearchValueProvider({children}: SearchValueProviderProps) {
  console.log("searchvalue context fut");
  
  const [ searchParams ] = useSearchParams()
  const [ searchValue, setSearchValue ] = useState(searchParams.get("search") ??  "")

  return (
    <SearchValueContext.Provider value={{searchValue, setSearchValue}}>
      {children}
    </SearchValueContext.Provider>
  )
}