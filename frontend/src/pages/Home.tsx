import { useQuery } from "@tanstack/react-query";
import { getAllPuzzles } from "../api/puzzle.service";
import CardComponents from "../components/Card";
import { PuzzleType } from "../types";
import {
  Box,
  Grid2,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { bouncy } from "ldrs";
import { PageContext } from "../context/PageContext";
import { SearchValueContext } from "../context/SearchValueContext";
import { default as sadBluePuzzle } from "../assets/sadpuzzle2.png";

export default function Home() {
  const { page, setPage } = useContext(PageContext);
  const { searchValue, setSearchValue } = useContext(SearchValueContext);
  const [perPage, setPerPage] = useState(6);

  const [searchParams, setSearchParams] = useSearchParams();

  const [puzzles, setPuzzles] = useState<PuzzleType[]>([]);
  const [paginatedPuzzles, setPaginatedPuzzles] = useState<PuzzleType[]>([]);
  const [filterError, setFilterError] = useState(false);

  const start = (page - 1) * perPage;
  const end = start + perPage;

  bouncy.register();

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
        const filteredPuzzles = puzzleList.filter(
          (currentPuzzle) =>
            currentPuzzle.title
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            currentPuzzle.brand
              .toLowerCase()
              .includes(searchValue.toLowerCase())
        );
        setPuzzles(filteredPuzzles);
      } else {
        setPuzzles(puzzleList);
      }
      const filteredPuzzles = puzzleList.filter(
        (currentPuzzle) =>
          currentPuzzle.title
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          currentPuzzle.brand.toLowerCase().includes(searchValue.toLowerCase())
      );
      if (filteredPuzzles.length === 0) {
        setFilterError(true)
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
      setFilterError(false);
    }

    if (searchValue === "" && puzzleList !== undefined) {
      setPuzzles(puzzleList);
    } else if (puzzleList !== undefined) {
      const filteredPuzzles = puzzleList.filter(
        (currentPuzzle) =>
          currentPuzzle.title
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          currentPuzzle.brand.toLowerCase().includes(searchValue.toLowerCase())
      );

      if (filteredPuzzles.length === 0 && searchValue !== "") {
        setFilterError(true);
      } else {
        setFilterError(false);
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
            <TextField
              type="search"
              placeholder="search..."
              value={searchValue}
              size="medium"
              color="secondary"
              sx={{ width: "350px" }}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {/* {filterError && (
              <Box>
                <Typography>hello</Typography>
                <img src="sad_puzzle" />
              </Box>
            )} */}
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
              <CardComponents key={puzzle._id} puzzle={puzzle} />
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
              {/* <Typography>Page: {page}</Typography> */}
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
          {!filterError ? (
            <Grid2
              container
              justifyContent="center"
              alignItems="center"
              sx={{ height: "100vh" }}
            >
              <l-bouncy size="100" speed="1.75" color="#44656e"></l-bouncy>
            </Grid2>
          ) : (
            <Box
              sx={{
                display: "grid",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <TextField
                type="search"
                placeholder="search..."
                value={searchValue}
                size="medium"
                color="secondary"
                sx={{ width: "350px" }}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {filterError && (
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
