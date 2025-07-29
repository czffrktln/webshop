import { TextField } from "@mui/material";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../store/features/searchValueSlice";

function SearchInput() {
  const searchValue = useSelector((state: RootState) => state.searchValue);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <TextField
        type="search"
        placeholder="search..."
        value={searchValue}
        size="medium"
        color="secondary"
        sx={{ width: "350px" }}
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
      />
    </>
  );
}

export default SearchInput;
