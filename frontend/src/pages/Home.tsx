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
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { bouncy } from "ldrs";

// type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? ""
  );
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

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

  const start = (page - 1) * perPage;
  const end = start + perPage;
  // const puzzleListLength =
  // Math.ceil(puzzleList.length / perPage);

  const paginatedPuzzles = puzzleList?.slice(start, end);
  const filteredPuzzles = paginatedPuzzles?.filter(
    (currentPuzzle) =>
      currentPuzzle.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      currentPuzzle.brand.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    if (searchValue !== "") {
      searchParams.set("search", searchValue);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  }, [searchValue]);

  console.log("filteredPuzzles", filteredPuzzles);

  function handleOnPageChange(
    event: React.ChangeEvent<unknown>,
    value: number
  ) {
    setPage(value);
  }

  // useEffect(() => {
  //   searchParams.set("page", String(page));
  //   setSearchParams(searchParams);
  // }, [page]);

  return (
    <>
      {puzzleList ? (
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
            {filteredPuzzles?.map((puzzle) => (
              <CardComponents key={puzzle._id} puzzle={puzzle} />
            ))}
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginY: "50px" }}
          >
            <Stack spacing={2}>
              <Typography>Page: {page}</Typography>
              <Pagination
                count={Math.ceil(puzzleList.length / perPage)}
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
