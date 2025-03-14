import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PuzzleType } from "../types";
import { CartContext } from "../context/CartContext";
import { Card, Typography, Box, Button } from "@mui/material";

interface PuzzleProps {
  puzzle: PuzzleType;
}

export default function CardComponents({ puzzle }: PuzzleProps) {
  const { title, image_link, brand, price, _id, pieces, serial_number } =
    puzzle;
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <Card
      // onClick={() => navigate(`/product/${_id}`)}
      sx={{
        cursor: "pointer",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        py: 1,
        gap: 1,
        boxShadow: "none",
        border: "1px solid",
        borderColor: "lightgrey",
      }}
    >
      <Box sx={{ height: "60%" }} onClick={() => navigate(`/product/${_id}`)}>
        <img
          style={{
            width: "250px",
            padding: "10px",
            height: "250px",
            objectFit: "contain",
            // boxShadow: "3px 3px 5px lightgrey",

            borderRadius: "5px",
          }}
          src={image_link}
        />
      </Box>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          px: 1,
          height: "35%",
        }}
        onClick={() => navigate(`/product/${_id}`)}
      >
        <Typography variant="h6" sx={{ textAlign: "center" }} title={title}>
          {title.length > 25 ? title.slice(0, 22).trim() + "..." : title}
        </Typography>
        <Typography>{brand}</Typography>
        <Typography sx={{ fontWeight: "bold", mt: 1 }}>{price} Ft</Typography>
      </Box>

      <Box sx={{ my: 2, height: "15%" }}>
        <Button
          variant="contained"
          onClick={() =>
            addToCart({
              title,
              image_link,
              brand,
              price,
              _id,
              pieces,
              serial_number,
            })
          }
        >
          Add to cart
        </Button>
      </Box>
    </Card>
  );
}
