import { useQuery } from "@tanstack/react-query";
import { getAllPuzzles } from "../api/puzzle.service";
import CardComponent from "../components/Card";
import SearchInput from "../components/Inputs/SearchInput";
import BouncyLoader from "../components/BouncyLoader";
import { filterPuzzles } from "../utils/filterPuzzles";
import { PuzzleType } from "../types";
import {
  Box,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageContext } from "../context/PageContext";
import { SearchValueContext } from "../context/SearchValueContext";
import { default as sadBluePuzzle } from "../assets/sadpuzzle2.png";
import useCartMutation from "../hooks/useCartMutation";
import SnackBarComponent from "../components/SnackBarComponent";
import { SnackbarContext } from "../context/SnackbarContext";

export default function Home() {
  useCartMutation();

  const { page, setPage } = useContext(PageContext);
  const { searchValue } = useContext(SearchValueContext);
  const {
    snackbarState,
    setSnackbarState,
    snackbarMessage,
  } = useContext(SnackbarContext);
  const [perPage, setPerPage] = useState(12);

  const [searchParams, setSearchParams] = useSearchParams();

  const [puzzles, setPuzzles] = useState<PuzzleType[]>([]);
  const [paginatedPuzzles, setPaginatedPuzzles] = useState<PuzzleType[]>([]);
  const [hasSearchResult, setHasSearchResult] = useState(false);

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const {
    data: puzzleList,
    error,
    isError,
  } = useQuery<PuzzleType[]>({
    queryKey: ["puzzles"],
    queryFn: () => getAllPuzzles(),
  });

  if (isError) {
    console.log(error);
    // return <ErrorPage/>
  }

  function handleOnPerPageChange(e: SelectChangeEvent<number>) {
    setPerPage(Number(e.target.value));
    setPage(1);
  }

  useEffect(() => {
    if (puzzleList !== undefined) {
      if (searchValue !== "") {
        const filteredPuzzles = filterPuzzles(puzzleList, searchValue);
        if (filteredPuzzles.length === 0) {
          setHasSearchResult(true);
        } else {
          setPuzzles(filteredPuzzles);
        }
      } else {
        setPuzzles(puzzleList);
      }
    }
  }, [puzzleList]);

  useEffect(() => {
    setPaginatedPuzzles(puzzles.slice(start, end));
  }, [puzzles]);

  useEffect(() => {
    if (searchValue !== "") {
      searchParams.set("search", searchValue);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
      setHasSearchResult(false);
    }

    if (searchValue === "" && puzzleList !== undefined) {
      setPuzzles(puzzleList);
    } else if (puzzleList !== undefined) {
      const filteredPuzzles = filterPuzzles(puzzleList, searchValue);
      if (filteredPuzzles.length === 0 && searchValue !== "") {
        setHasSearchResult(true);
      } else {
        setHasSearchResult(false);
      }
      setPuzzles(filteredPuzzles);
      setPage(1);
    }
  }, [searchValue]);

  function handleOnPageChange(
    event: React.ChangeEvent<unknown>,
    value: number
  ) {
    setPage(value);
  }

  useEffect(() => {
    if (page === 1) {
      searchParams.delete("page");
      setSearchParams(searchParams);
    } else {
      searchParams.set("page", String(page));
      setSearchParams(searchParams);
    }
    setPaginatedPuzzles(puzzles.slice(start, end));
  }, [page, perPage]);

  return (
    <>
      {paginatedPuzzles.length > 0 ? (
        <>
          <Box sx={style.searchInputBox}>
            <SearchInput />
          </Box>

          <Box sx={style.puzzlesContainer}>
            {paginatedPuzzles.map((puzzle) => (
              <CardComponent key={puzzle._id} puzzle={puzzle} />
            ))}
          </Box>

          <Box sx={style.paginationBox}>
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(puzzles?.length / perPage)}
                page={page}
                size="large"
                color="primary"
                onChange={handleOnPageChange}
              />
            </Stack>
          </Box>

          <Box sx={style.viewSelectorBox}>
            <Typography sx={{ letterSpacing: "1px" }}>View: </Typography>
            <Select
              size="small"
              value={perPage}
              onChange={(e) => handleOnPerPageChange(e)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                ".MuiOutlinedInput-notchedOutline": { borderStyle: "none" },
              }}
            >
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={24}>24</MenuItem>
              <MenuItem value={36}>36</MenuItem>
            </Select>
          </Box>
        </>
      ) : (
        <>
          {!hasSearchResult ? (
            <BouncyLoader />
          ) : (
            <Box
              sx={style.missingAPiece.container}
            >
              <SearchInput />
              {hasSearchResult && (
                <Box sx={style.missingAPiece.imageAndText}>
                  <img width="300px" height="300px" src={sadBluePuzzle} />
                  <Typography sx={style.missingAPiece.text}>
                    Looks like we are missing a piece!
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </>
      )}
      <SnackBarComponent
        message={snackbarMessage}
        style={style.snackBarContent}
        snackbarState={snackbarState}
        setSnackbarState={setSnackbarState}
      />
    </>
  );
}

const style = {
  snackBarContent: {
    bgcolor: "#E7F59E",
    color: "black",
  },
  missingAPiece: {
    container: {
      display: "grid",
      justifyContent: "center",
      marginTop: "50px",
    },
    imageAndText: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      margin: "auto",
      marginTop: "20px",
    },
    text: {
      textAlign: "center", letterSpacing: "1px"
    }
  },
  searchInputBox: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  },
  puzzlesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "40px 40px",
    justifyItems: "center",
    padding: "0 5%",
    marginTop: "50px",
  },
  paginationBox: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
    marginBottom: "25px",
  },
  viewSelectorBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  }
};
