import { Button, Grid2, Typography } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { CartItemType } from "../types";

interface QuantitySelectorButtonPropsType {
  cartItem: CartItemType;
}

export default function QuantitySelectorButton({
  cartItem,
}: QuantitySelectorButtonPropsType) {
  const { addToCart, decreaseAmount } = useContext(CartContext);
  const { quantity } = cartItem;

  return (
    <Grid2 container gap={1}>
      <Button
        onClick={() => decreaseAmount(cartItem)}
        variant="contained"
        sx={{
          padding: 0,
          minWidth: "25px",
          textAlign: "center",
          verticalAlign: "middle",
          height: "25px",
        }}
      >
        <Typography>−</Typography>
      </Button>
      <Typography>{quantity}</Typography>

      <Button
        onClick={() => addToCart(cartItem)}
        variant="contained"
        sx={{
          padding: 0,
          minWidth: "25px",
          textAlign: "center",
          verticalAlign: "middle",
          height: "25px",
        }}
      >
        <Typography>+</Typography>
      </Button>
    </Grid2>
  );
}
