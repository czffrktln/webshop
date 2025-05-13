import { CSSProperties, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCurrentPuzzle } from "../api/puzzle.service";
import { CartContext } from "../context/CartContext";
import { PuzzleType } from "../types";
import { Box, Button, Container, Grid2, Typography } from "@mui/material";

export default function Product() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const {
    data: currentPuzzle,
    isError,
    error,
  } = useQuery<PuzzleType>({
    queryKey: ["puzzle", id],
    queryFn: () => getCurrentPuzzle(id!),
  });

  if (isError) {
    console.log(error);
    // return <ErrorPage/>
  }

  return (
    <>
      {currentPuzzle && (
        <Container sx={{ marginTop: "100px" }}>
          <Grid2
            container
            spacing={2}
            sx={{ marginTop: "100px" }}
            justifyContent={"center"}
          >
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <img src={currentPuzzle.image_link} style={imageStyle} />
            </Grid2>

            <Grid2 sx={style.puzzleDetails} size={{ xs: 12, sm: 6 }}>
              <Box sx={{ width: "100%" }}>
                <Typography variant="h4" fontSize="2.5rem">
                  {currentPuzzle.title} - {currentPuzzle.pieces} pieces
                </Typography>
                <Typography variant="h5">
                  Brand: {currentPuzzle.brand}
                </Typography>
                <Typography>
                  Rating:{" "}
                  {currentPuzzle.rating
                    ? "⭐".repeat(Number(currentPuzzle.rating))
                    : "No rating yet"}
                </Typography>
                <Typography>Size: {currentPuzzle.size}</Typography>
                <Typography>
                  Serial no.: {currentPuzzle.serial_number}
                </Typography>
                <Typography>
                  {currentPuzzle.available ? "In stock" : "Out of stock"}
                </Typography>
                <Typography fontWeight="bold">
                  {currentPuzzle.price} Ft
                </Typography>
              </Box>
              <Box sx={style.addToCartButtonBox}>
                <Button
                  variant="contained"
                  onClick={() => addToCart(currentPuzzle)}
                >
                  Add to cart
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </Container>
      )}
    </>
  );
}

const imageStyle: CSSProperties = {
  objectFit: "contain",
  maxWidth: "100%",
};

const style = {
  puzzleDetails: {
    display: "Flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
    gap: 2,
    px: 2,
  },
  addToCartButtonBox: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },
};
