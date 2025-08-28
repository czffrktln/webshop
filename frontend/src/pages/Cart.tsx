import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import CartItem from "../components/CartItem";
import { useMutation } from "@tanstack/react-query";
import { CartItemType, CartType } from "../types";
import { sendOrder } from "../api/order.service";
import { getCookie } from "../utils/cookies";
import { useNavigate } from "react-router-dom";
import SnackBarComponent from "../components/SnackBarComponent";
import formatPrice from "../utils/formatPrice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setSnackbar } from "../store/features/snackbarSlice";
import { clearCart } from "../store/features/cartSlice";

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  const { total } = useSelector((state: RootState) => state.cartTotals);

  const navigate = useNavigate();

  const onOrderMutation = useMutation({
    mutationFn: (cart: CartType) => sendOrder(cart),
    onSuccess: () => {
      console.log("sikerült az order");
      dispatch(
        setSnackbar({ open: true, message: "Your order has been sent" })
      );
      navigate("/");
      dispatch(clearCart());
    },
  });

  function sendOrderClick(cart: CartItemType[]) {
    if (!user) {
      dispatch(
        setSnackbar({ open: true, message: "You must log in to order" })
      );
    } else {
      onOrderMutation.mutate({
        session_id: getCookie("sessionId"),
        puzzles: cart,
        user_id: user._id,
        cart_total: total,
      });
    }
  }

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
            Subtotal: {formatPrice(total)} HUF
          </Typography>
          <Button variant="contained" onClick={() => sendOrderClick(cart)}>
            ORDER
          </Button>
        </Grid2>
      </Grid2>

      {!user && <SnackBarComponent style={style.snackBarContent} />}
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
  snackBarContent: {
    bgcolor: "warning.main",
    color: "black",
  },
};
