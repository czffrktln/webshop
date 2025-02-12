import { Box } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CardComponents from "../components/Card";
import { PuzzleType } from "../types";
import { PuzzleContext } from "../context/PuzzleContext";

export default function Home() {
  const { puzzleList, setPuzzleList } = useContext(PuzzleContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((response) => {
        console.log("response", response);
        setPuzzleList(response.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log("puzzleList", puzzleList);

  return (
    <Box
      sx={{
        // border: "2px solid orange",
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
