import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { CartContext } from "../context/CartContext"
import { useMutation } from "@tanstack/react-query"
import { writeCurrentCart } from "../api/cart.service"
import { CartType } from "../types"
import { getCookie } from "../utils/cookies"

function useCartMutation() {

  const { user } = useContext(UserContext)
  const { cart } = useContext(CartContext)

  const onCartMutation = useMutation({
    mutationFn: (currentCart: CartType) => writeCurrentCart(currentCart)
  });

  useEffect(() => {
    onCartMutation.mutate({
      session_id: getCookie("sessionId"),
      puzzles: cart,
      user_id: user ? user._id : null
    });
  }, [cart, user]) 
}

export default useCartMutation