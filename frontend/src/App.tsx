import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { Container, Paper, Typography } from "@mui/material";

function App() {
  const [puzzleList, setPuzzleList] = useState([]);

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
    <>
      <Header />
      <Container>
        {puzzleList?.map((puzzle) => (
          <Paper elevation={5}>
            <Typography>{puzzle.title}</Typography>
          </Paper>
        ))}
      </Container>
    </>
  );
}

export default App;
