import { Button, Grid2, Typography } from "@mui/material";

import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { CartItemType } from "../types";

interface CartItemProps {
  cartItem: CartItemType;
}

export default function CartItem({ cartItem }: CartItemProps) {
  const { image_link, brand, title, pieces, price, quantity } = cartItem;
  const { addToCart } = useContext(CartContext);

  return (
    <Grid2
      className="cartContainer"
      container
      flexDirection="column"
      sx={{ height: "200px", width: "100%", borderBottom: "2px solid pink" }}
      size={{ xs: 6 }}
    >
      <Grid2
        sx={{ width: "30%", height: "100%" }}
        container
        justifyContent="center"
        alignItems="center"
      >
        <img
          src={image_link}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
            padding: "10px",
          }}
        />
      </Grid2>
      <Grid2
        container
        justifyContent="space-around"
        alignItems="center"
        sx={{ width: "70%", height: "100%" }}
      >
        <Grid2 sx={{ width: "100%", px: 1 }}>
          <Grid2
            container
            justifyContent="space-between"
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Typography sx={{ typography: { xs: "subtitle2", sm: "h6" } }}>
              {title}
            </Typography>
            <Typography variant="subtitle2">{price} HUF</Typography>
          </Grid2>
          <Typography variant="caption">{brand}</Typography>
          <Typography variant="caption">{pieces} db</Typography>
          <Grid2 container gap={1}>
            <Button
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
        </Grid2>
        {/* <Grid2 sx={{ width: "20%" }}>
          <Typography>{price} HUF</Typography>
        </Grid2> */}
      </Grid2>
    </Grid2>
  );
}
