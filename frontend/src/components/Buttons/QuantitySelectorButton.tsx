import { Button, Grid2, Typography } from "@mui/material";

import { CartItemType } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { decreaseAmount, increaseAmount } from "../../store/features/cartSlice";

interface QuantitySelectorButtonPropsType {
  cartItem: CartItemType;
}

export default function QuantitySelectorButton({
  cartItem,
}: QuantitySelectorButtonPropsType) {
  const { quantity } = cartItem;
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Grid2 container gap={1}>
      <Button
        onClick={() => dispatch(decreaseAmount(cartItem))}
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
        onClick={() => dispatch(increaseAmount(cartItem))}
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
