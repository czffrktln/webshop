import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PuzzleType } from "../types";
import { CartContext } from "../context/CartContext";
import { Card, Typography, Box, Button } from "@mui/material";
import QuantitySelectorButton from "./Buttons/QuantitySelectorButton";
import formatPrice from "../utils/formatPrice";

interface PuzzleProps {
  puzzle: PuzzleType;
}

export default function CardComponent({ puzzle }: PuzzleProps) {
  const { title, image_link, brand, price, _id } = puzzle;
  const { addToCart, cart } = useContext(CartContext);
  const navigate = useNavigate();
 
  const [currentItem] = cart.filter(item => item.puzzle._id === _id)

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
        <Typography sx={{ fontWeight: "bold", mt: 1 }}>{formatPrice(price)} HUF</Typography>
      </Box>

      <Box sx={{ my: 2, height: "15%" }}>
        {currentItem
        ? 
          <QuantitySelectorButton cartItem={currentItem} /> 
        : 
          <Button
            variant="contained"
            onClick={() =>
              addToCart(puzzle)
            }
          >
            Add to cart
          </Button>
        }
      </Box>
    </Card>
  );
}
