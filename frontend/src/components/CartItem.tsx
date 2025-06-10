import { Grid2, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { CartItemType } from "../types";
import QuantitySelectorButton from "./Buttons/QuantitySelectorButton";
import { Link } from "react-router-dom";
import formatPrice from "../utils/formatPrice";

interface CartItemProps {
  cartItem: CartItemType;
}

export default function CartItem({ cartItem }: CartItemProps) {
  const { image_link, brand, title, pieces, price, _id } = cartItem.puzzle;
  const { removeItem } = useContext(CartContext);

  return (
    <Grid2
      className="cartContainer"
      container
      flexDirection="column"
      sx={{
        height: "200px",
        width: "100%",
        borderBottom: "1px solid",
        borderColor: "primary.main",
      }}
      size={{ xs: 6 }}
    >
      <Grid2
        sx={{ width: "30%", height: "100%" }}
        container
        justifyContent="center"
        alignItems="center"
      >
      <Link to={`/product/${_id}`} style={{ width: "100%", height: "100%" }}>
          <img
            src={image_link}
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
              padding: "10px",
            }}
          />
        </Link>
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
            <Link to={`/product/${_id}`} style={{textDecoration: "none", color: "black" }}>
              <Typography sx={{ typography: { xs: "subtitle2", sm: "h6" }}}>
                {title}
              </Typography>
            </Link>
            <Typography sx={{ typography: { xs: "subtitle2", sm: "h6" } }}>
              <strong>{formatPrice(price)} HUF</strong>
            </Typography>
          </Grid2>
          <Grid2 container flexDirection="column">
            <Typography sx={{ typography: { xs: "body2", sm: "subtitle1" } }}>
              {brand}
            </Typography>
            <Typography sx={{ typography: { xs: "caption", sm: "subtitle2" } }}>
              {pieces} db
            </Typography>
            {/* <Typography>Remove</Typography> */}
          </Grid2>
          <Grid2
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ marginTop: "8px" }}
          >
            <QuantitySelectorButton cartItem={cartItem} />

            <Grid2>
              <IconButton onClick={() => removeItem(_id)}>
                <DeleteIcon sx={{ color: "secondary.main" }} />
              </IconButton>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
