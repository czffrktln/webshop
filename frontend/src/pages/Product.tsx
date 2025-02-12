import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PuzzleContext } from "../context/PuzzleContext";
import { Box, Container, Grid2 } from "@mui/material";

export default function Product() {
  const { id } = useParams();
  const { puzzleList } = useContext(PuzzleContext);

  const [currentPuzzle] = puzzleList.filter((puzzle) => puzzle._id === id);

  const { title, image_link } = currentPuzzle;

  console.log("id", id);
  console.log("currentPuzzle", currentPuzzle);
  console.log("puzzleList", puzzleList);

  return (
    <Box sx={{ marginTop: "100px" }}>
      <Grid2 container>
        <Grid2 sx={{ border: "2px solid yellow" }}>
          <img src={image_link} />
        </Grid2>

        <Grid2 sx={{ border: "2px solid red" }}>
          <h1>{title}</h1>
        </Grid2>
      </Grid2>
    </Box>
  );
}
