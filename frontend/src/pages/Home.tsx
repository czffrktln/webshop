import { useQuery } from "@tanstack/react-query";
import { getAllPuzzles } from "../api/puzzle.service";
import CardComponent from "../components/Card";
import SearchInput from "../components/Inputs/SearchInput";
import BouncyLoader from "../components/BouncyLoader";
import { filterPuzzles } from "../utils/filterPuzzles";
import { PuzzleType } from "../types";
import {
  Box,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageContext } from "../context/PageContext";
import { SearchValueContext } from "../context/SearchValueContext";
import { default as sadBluePuzzle } from "../assets/sadpuzzle2.png";
import useCartMutation from "../hooks/useCartMutation";

export default function Home() {

  useCartMutation()

  const { page, setPage } = useContext(PageContext);
  const { searchValue } = useContext(SearchValueContext);
  const [perPage, setPerPage] = useState(6);

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

  useEffect(() => {
    if (puzzleList !== undefined) {
      if (searchValue !== "") {
        const filteredPuzzles = filterPuzzles(puzzleList, searchValue)
        if (filteredPuzzles.length === 0) {
          setHasSearchResult(true)
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
      const filteredPuzzles = filterPuzzles(puzzleList, searchValue)
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
  }, [page]);

  return (
    <>
      {paginatedPuzzles.length > 0 ? (
        <>
          <Box
            sx={{
              display: "grid",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <SearchInput />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "40px 40px",
              justifyItems: "center",
              padding: "0 5%",
              marginTop: "50px",
            }}
          >
            {paginatedPuzzles.map((puzzle) => (
              <CardComponent key={puzzle._id} puzzle={puzzle} />
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginY: "50px",
            }}
          >
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
        </>
      ) : (
        <>
          {!hasSearchResult ? (
            <BouncyLoader />
          ) : (
            <Box
              sx={{
                display: "grid",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <SearchInput />
              {hasSearchResult && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: "auto",
                    marginTop: "20px",
                  }}
                >
                  <img width="300px" height="300px" src={sadBluePuzzle} />
                  <Typography
                    sx={{ textAlign: "center", letterSpacing: "1px" }}
                  >
                    Looks like we are missing a piece!
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </>
      )}
    </>
  );
}
