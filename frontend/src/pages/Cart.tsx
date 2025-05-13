import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { cart, total } = useContext(CartContext);

  return (
    <Container>
      <Grid2 container spacing={{ xs: 5, md: 8 }}>
        <Grid2 size={{ xs: 12, sm: 8, md: 9 }} sx={style.column}>
          <Typography sx={style.columnTitles}>
            Shopping Cart ({cart.length} items)
          </Typography>
          <Box sx={style.cartItemBox}>
            {cart.map((cartItem) => (
              <CartItem key={cartItem.puzzle._id} cartItem={cartItem} />
            ))}
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 4, md: 3 }} sx={style.column}>
          <Typography sx={style.columnTitles}>Order Summary</Typography>
          <Typography sx={style.subtotalText} fontWeight="600">
            Subtotal: {total} HUF
          </Typography>
          <Button variant="contained">ORDER</Button>
        </Grid2>
      </Grid2>
    </Container>
  );
}

const style = {
  columnTitles: {
    typography: { xs: "h6", sm: "h5" },
    borderBottom: "1px solid",
    borderColor: "primary.main",
  },
  column: { paddingTop: { xs: "10px", sm: "30px" } },
  cartItemBox: { height: "85vh", overflow: "auto", overflowX: "hidden" },
  subtotalText: { marginTop: "20px" },
};
