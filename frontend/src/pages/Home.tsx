import { useEffect, useContext } from "react";
import axios from "axios";
import CardComponents from "../components/Card";
import { PuzzleContext } from "../context/PuzzleContext";
import { Box } from "@mui/material";

export default function Home() {
  const { puzzleList, setPuzzleList } = useContext(PuzzleContext);

  useEffect(() => {
    console.log("puzzle lekeres fut");
    
    axios
      .get("http://localhost:3000/puzzle")
      .then((response) => {
        setPuzzleList(response.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
