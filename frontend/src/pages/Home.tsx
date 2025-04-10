import { useQuery } from "@tanstack/react-query";
import { getAllPuzzles } from "../api/puzzle.service";
import CardComponents from "../components/Card";
import { PuzzleType } from "../types";
import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? ""
  );

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

  const filteredPuzzles = puzzleList?.filter((currentPuzzle) =>
    currentPuzzle.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  function handleOnSearchByName(e: InputEvent) {
    setSearchValue(e.target.value);
  }

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

  return (
    <>
      <Box
        sx={{ display: "grid", justifyContent: "center", marginTop: "50px" }}
      >
        <TextField
          type="search"
          placeholder="search..."
          value={searchValue}
          size="medium"
          color="secondary"
          sx={{ width: "350px" }}
          onChange={(e) => handleOnSearchByName(e)}
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
    </>
  );
}
