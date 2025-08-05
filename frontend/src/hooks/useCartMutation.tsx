import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useMutation } from "@tanstack/react-query";
import { writeCurrentCart } from "../api/cart.service";
import { CartType } from "../types";
import { getCookie } from "../utils/cookies";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function useCartMutation() {
  const { cart, total } = useContext(CartContext);

  const user = useSelector((state: RootState) => state.user);

  const onCartMutation = useMutation({
    mutationFn: (currentCart: CartType) => writeCurrentCart(currentCart),
  });

  useEffect(() => {
    onCartMutation.mutate({
      session_id: getCookie("sessionId"),
      puzzles: cart,
      user_id: user ? user._id : null,
      cart_total: total,
    });
  }, [cart, user]);
}

export default useCartMutation;
