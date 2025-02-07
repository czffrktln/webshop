import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CardComponents from "./components/Card";

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
      <Box 
        sx={{ 
          // border: "2px solid orange",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "40px 40px",
          justifyItems: "center",
          padding: "0 5%"
        }}>
          {puzzleList?.map((puzzle) => (
            <CardComponents key={puzzle._id} puzzle={puzzle} />
          ))}
      </Box>
    </>
  );
}

export default App;
