import {
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <Container sx={{ marginTop: { xs: "80px", sm: "100px" }, height: "100vh" }}>
      <Grid2 container spacing={{ xs: 5, md: 8 }}>
      {/* sx={{ border: "2px solid red" }} */}
        <Grid2 size={{ xs: 12, sm: 8, md: 9 }}>
          <Typography sx={{ typography: { xs: "h6", sm: "h5" }, borderBottom: "1px solid", borderColor: "primary.main"  }}  >
            Shopping Cart ({cart.length} items)
          </Typography>
          {cart.map((cartItem) => (
            <CartItem key={cartItem._id} cartItem={cartItem} />
          ))}
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
          <Typography sx={{ typography: { xs: "h6", sm: "h5" }, borderBottom: "1px solid", borderColor: "primary.main"  }}>
            Order Summary
          </Typography>
          <Typography>
            Subtotal: valami
          </Typography>
        </Grid2>
      </Grid2>
    </Container>
  );
}
