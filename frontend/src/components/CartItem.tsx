import { Grid2, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { CartContext } from "../context/CartContext";
import { CSSProperties, useContext } from "react";
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
      container
      flexDirection="column"
      sx={style.container}
      size={{ xs: 6 }}
    >
      <Grid2
        sx={style.containerLeftSide}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Link to={`/product/${_id}`} style={style.imageLink}>
          <img src={image_link} style={imageStyle} />
        </Link>
      </Grid2>
      <Grid2
        container
        justifyContent="space-around"
        alignItems="center"
        sx={style.containerRightSide}
      >
        <Grid2 sx={style.rigthSideContent}>
          <Grid2
            container
            justifyContent="space-between"
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Link to={`/product/${_id}`} style={titleLink}>
              <Typography sx={style.title}>{title}</Typography>
            </Link>
            <Typography sx={style.price}>
              <strong>{formatPrice(price)} HUF</strong>
            </Typography>
          </Grid2>
          <Grid2 container flexDirection="column">
            <Typography sx={style.brand}>{brand}</Typography>
            <Typography sx={style.pieces}>{pieces} db</Typography>
          </Grid2>
          <Grid2
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={style.buttonContainer}
          >
            <QuantitySelectorButton cartItem={cartItem} />

            <Grid2>
              <IconButton onClick={() => removeItem(_id)}>
                <DeleteIcon sx={style.deleteIcon} />
              </IconButton>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

const style = {
  container: {
    height: "200px",
    width: "100%",
    borderBottom: "1px solid",
    borderColor: "primary.main",
  },
  containerLeftSide: { width: "30%", height: "100%" },
  imageLink: { width: "100%", height: "100%" },
  containerRightSide: { width: "70%", height: "100%" },
  rigthSideContent: { width: "100%", px: 1 },
  title: { typography: { xs: "subtitle2", sm: "h6" } },
  price: { typography: { xs: "subtitle2", sm: "h6" } },
  brand: { typography: { xs: "body2", sm: "subtitle1" } },
  pieces: { typography: { xs: "caption", sm: "subtitle2" } },
  buttonContainer: { marginTop: "8px" },
  deleteIcon: { color: "secondary.main" },
};

const imageStyle: CSSProperties = {
  objectFit: "contain",
  width: "100%",
  height: "100%",
  padding: "10px",
};

const titleLink: CSSProperties = { textDecoration: "none", color: "black" };
