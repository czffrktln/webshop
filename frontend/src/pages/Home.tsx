import { useQuery } from '@tanstack/react-query'
import { getAllPuzzles } from "../api/puzzle.service";
import CardComponents from "../components/Card";
import { PuzzleType } from "../types";
import { Box } from "@mui/material";

export default function Home() {

  const { data: puzzleList, error, isError } = useQuery<PuzzleType[]>({
    queryKey: ['puzzles'],
    queryFn: () => getAllPuzzles()
  })

  if (isError) {
    console.log(error);
    // return <ErrorPage/>
  } 

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "40px 40px",
        justifyItems: "center",
        padding: "0 5%",
        marginTop: "100px",
      }}
    >
      {puzzleList?.map((puzzle) => (
        <CardComponents key={puzzle._id} puzzle={puzzle} />
      ))}
    </Box>
  );
}
