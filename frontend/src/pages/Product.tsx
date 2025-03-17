import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import axios from "axios";
import { PuzzleType } from "../types";


export default function Product() {

  const { id } = useParams();
  const [ currentPuzzle, setCurrentPuzzle ] = useState<PuzzleType| null >(null)
 

  useEffect(() => {
    axios
      .get(`http://localhost:3000/puzzle/${id}`)
      .then((response) => {
        console.log("response", response.data);
        
        setCurrentPuzzle(response.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);


  return (
    <>
    { currentPuzzle && 
    <Container sx={{ marginTop: "100px" }}>
      <Grid2
        container
        spacing={2}
        sx={{ marginTop: "100px" }}
        justifyContent={"center"}
      >
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <img
            src={currentPuzzle.image_link}
            style={{
              objectFit: "contain",
              maxWidth: "100%",
            }}
          />
        </Grid2>

        <Grid2
          sx={{
            // border: "2px solid red",
            display: "Flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "left",
            gap: 2,
            px: 2,
          }}
          size={{ xs: 12, sm: 6 }}
        >
          {/* //width: "45%" */}
          <Box sx={{ width: "100%" }}>
            <Typography variant="h4" fontSize="2.5rem">
              {currentPuzzle.title} - {currentPuzzle.pieces} pieces
            </Typography>
            <Typography variant="h5">Brand: {currentPuzzle.brand}</Typography>
            <Typography>
              Rating: {currentPuzzle.rating ? "⭐".repeat(Number(currentPuzzle.rating)) : "No rating yet"}
            </Typography>
            <Typography>Size: {currentPuzzle.size}</Typography>
            <Typography>Serial no.: {currentPuzzle.serial_number}</Typography>
            <Typography>{currentPuzzle.available ? "In stock" : "Out of stock"}</Typography>
            <Typography fontWeight="bold">{currentPuzzle.price} Ft</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",

              width: "100%",
            }}
          >
            <Button variant="contained">Add to cart</Button>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  }
  </>
  );
}
