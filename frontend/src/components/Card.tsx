import { CSSProperties, useContext } from "react";
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

  const [currentItem] = cart.filter((item) => item.puzzle._id === _id);

  return (
    <Card sx={styles.card}>
      <Box sx={styles.imageBox} onClick={() => navigate(`/product/${_id}`)}>
        <img style={imageStyle} src={image_link} />
      </Box>
      <Box sx={styles.cardTextBox} onClick={() => navigate(`/product/${_id}`)}>
        <Typography variant="h6" sx={styles.title} title={title}>
          {title.length > 25 ? title.slice(0, 22).trim() + "..." : title}
        </Typography>
        <Typography>{brand}</Typography>
        <Typography sx={styles.price}>{formatPrice(price)} HUF</Typography>
      </Box>

      <Box sx={styles.buttonBox}>
        {currentItem ? (
          <QuantitySelectorButton cartItem={currentItem} />
        ) : (
          <Button variant="contained" onClick={() => addToCart(puzzle)}>
            Add to cart
          </Button>
        )}
      </Box>
    </Card>
  );
}

const styles = {
  card: {
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
  },
  imageBox: { height: "60%" },
  cardTextBox: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    px: 1,
    height: "35%",
  },
  title: { textAlign: "center" },
  price: { fontWeight: "bold", mt: 1 },
  buttonBox: { my: 2, height: "15%" },
};

const imageStyle: CSSProperties = {
  width: "250px",
  padding: "10px",
  height: "250px",
  objectFit: "contain",
  borderRadius: "5px",
};
