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

// type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export default function Home() {
  const { page, setPage } = useContext(PageContext);
  const { searchValue, setSearchValue } = useContext(SearchValueContext);
  const [perPage, setPerPage] = useState(6);

  const [searchParams, setSearchParams] = useSearchParams();
  // const [searchValue, setSearchValue] = useState(
  //   searchParams.get("search") ?? ""
  // );

  const [puzzles, setPuzzles] = useState<PuzzleType[]>([]);
  const [paginatedPuzzles, setPaginatedPuzzles] = useState<PuzzleType[]>([]);
  const [filterError, setFilterError] = useState("");

  const start = (page - 1) * perPage;
  const end = start + perPage;

  bouncy.register();

  const {
    data: puzzleList,
    error,
    isError,
    isLoading,
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
    }
  }, [puzzleList]);

  // console.log("puzzlelist", puzzleList);
  console.log("puzzles", puzzles);
  // console.log("paginatedPuzzles", paginatedPuzzles);
  // console.log("searchparams", searchParams.get("search"));
  // console.log("pageparams", searchParams.get("page"));
  // console.log("page homeon", page);

  useEffect(() => {
    setPaginatedPuzzles(puzzles.slice(start, end));
  }, [puzzles]);

  useEffect(() => {
    console.log("searchvalues useeffect", searchValue);

    if (searchValue !== "") {
      searchParams.set("search", searchValue);
      setSearchParams(searchParams);
    } else {
      console.log("searchparams delete");

      searchParams.delete("search");
      setSearchParams(searchParams);
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

      console.log("filteredPuzzles", filteredPuzzles);

      if (filteredPuzzles.length === 0) {
        setFilterError("Not found");
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
      // if (Number(searchParams.get("page")) == 1) {
      console.log("pagedelete fut?", page);

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
            {filterError !== "" && <Typography>{filterError}</Typography>}
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
        <Grid2
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100vh" }}
        >
          <l-bouncy size="100" speed="1.75" color="#44656e"></l-bouncy>
        </Grid2>
      )}
    </>
  );
}
