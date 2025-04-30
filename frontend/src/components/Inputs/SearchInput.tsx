import { TextField } from "@mui/material"
import { useContext } from "react"
import { SearchValueContext } from "../../context/SearchValueContext"

function SearchInput() {

  const { searchValue, setSearchValue } = useContext(SearchValueContext)

  return (
    <>
      <TextField
        type="search"
        placeholder="search..."
        value={searchValue}
        size="medium"
        color="secondary"
        sx={{ width: "350px" }}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </>
  )
}

export default SearchInput