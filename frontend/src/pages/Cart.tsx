import {
  Button,
  Container,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CartItem from "../components/CartItem";
import { CartItemType } from "../types";

export default function Cart() {
  const { cart, addToCart } = useContext(CartContext);

  console.log("CART", cart);

  return (
    <Container sx={{ marginTop: "100px", height: "100vh" }}>
      <Grid2 container spacing={2}>
        <Grid2 sx={{ border: "2px solid red" }} size={{ xs: 12, sm: 9 }}>
          <Typography>Shopping Cart ({cart.length} items)</Typography>
          {cart.map((cartItem) => (
            <CartItem key={cartItem._id} cartItem={cartItem} />
          ))}
        </Grid2>
        <Grid2 sx={{ border: "2px solid orange" }} size={{ xs: 12, sm: 3 }}>
          <Typography>order summary</Typography>
        </Grid2>
      </Grid2>
    </Container>
  );
}
