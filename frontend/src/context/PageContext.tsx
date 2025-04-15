import { createContext, useState } from "react"
import { useSearchParams } from "react-router-dom";


interface PageContextType {
  page: number;
  setPage: (value: number) => void;
}

const defaultState: PageContextType = {
  page: 1,
  setPage: (value) => value,
};

export const PageContext = createContext(defaultState)

type PageProviderProps = {
  children: React.ReactNode;
};

export function PageProvider({children}: PageProviderProps) {

  const [ searchParams ] = useSearchParams()
  const [ page, setPage ] = useState(Number(searchParams.get("page") ??  1))

  return (
    <PageContext.Provider value={{page, setPage}}>
      {children}
    </PageContext.Provider>
  )
}