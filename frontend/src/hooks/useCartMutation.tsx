import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { writeCurrentCart } from "../api/cart.service";
import { CartType } from "../types";
import { getCookie } from "../utils/cookies";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setCart } from "../store/features/cartSlice";

function useCartMutation() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart)
  const { total } = useSelector((state: RootState) => state.cartTotals)
  

  const onCartMutation = useMutation({
    mutationFn: (currentCart: CartType) => writeCurrentCart(currentCart),
    onSuccess: async (response) => {
      const data = await response.json()
      dispatch(setCart(data.puzzles))
      
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    }
  });

  useEffect(() => {
    onCartMutation.mutate({
      session_id: getCookie("sessionId"),
      puzzles: cart,
      user_id: user ? user._id : null,
      cart_total: total,
    });
  }, [cart, user, total]);
}

export default useCartMutation;
