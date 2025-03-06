import { Button, Grid2, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { CartItemType } from "../types";

interface CartItemProps {
  cartItem: CartItemType;
}

export default function CartItem({ cartItem }: CartItemProps) {
  const { image_link, brand, title, pieces, price, quantity, _id } = cartItem;
  const { addToCart, decreaseAmount, removeItem } = useContext(CartContext);

  return (
    <Grid2
      className="cartContainer"
      container
      flexDirection="column"
      sx={{ height: "200px", width: "100%", borderBottom: "1px solid", borderColor: "primary.main" }}
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
            <Typography sx={{ typography: { xs: "subtitle2", sm: "h6" } }}><strong>{price} HUF</strong></Typography>
          </Grid2>
          <Grid2 container flexDirection="column">
            <Typography sx={{ typography: { xs: "body2", sm: "subtitle1" } }}>{brand}</Typography>
            <Typography sx={{ typography: { xs: "caption", sm: "subtitle2" } }}>{pieces} db</Typography>
            {/* <Typography>Remove</Typography> */}
          </Grid2>
          <Grid2 container justifyContent={"space-between"} alignItems={"center"} sx={{ marginTop: "8px"}}>
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
            <Grid2>
              <IconButton onClick={() => removeItem(_id)}>
                <DeleteIcon sx={{color: "secondary.main"}} />
              </IconButton>
            </Grid2>
          </Grid2>
        </Grid2>
        {/* <Grid2 sx={{ width: "20%" }}>
          <Typography>{price} HUF</Typography>
        </Grid2> */}
      </Grid2>
    </Grid2>
  );
}
