import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PuzzleContext } from "../context/PuzzleContext";
import { Box, Button, Container, Grid2, Typography } from "@mui/material";

export default function Product() {
  const { id } = useParams();
  const { puzzleList } = useContext(PuzzleContext);

  const [currentPuzzle] = puzzleList.filter((puzzle) => puzzle._id === id);

  const {
    title,
    image_link,
    serial_number,
    brand,
    pieces,
    price,
    size,
    available,

    rating,
  } = currentPuzzle;

  return (
    <Container sx={{ marginTop: "100px" }}>
      <Grid2
        container
        spacing={2}
        sx={{ marginTop: "100px" }}
        justifyContent={"center"}
      >
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <img
            src={image_link}
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
              {title} - {pieces} pieces
            </Typography>
            <Typography variant="h5">Brand: {brand}</Typography>
            <Typography>
              Rating: {rating ? "⭐".repeat(Number(rating)) : "No rating yet"}
            </Typography>
            <Typography>Size: {size}</Typography>
            <Typography>Serial no.: {serial_number}</Typography>
            <Typography>{available ? "In stock" : "Out of stock"}</Typography>
            <Typography fontWeight="bold">{price} Ft</Typography>
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
  );
}
