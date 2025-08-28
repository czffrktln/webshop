import "./App.css";
import Header from "./components/Header";
import { Outlet, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { useEffect } from "react";
import { setPage } from "./store/features/pageSlice";
import { setSearchValue } from "./store/features/searchValueSlice";
import { setUser } from "./store/features/userSlice";
import { setCart } from "./store/features/cartSlice";
import { decodeToken } from "./utils/decodeToken";
import { useQuery } from "@tanstack/react-query";
import { CartType } from "./types";
import { getCartBySesionId } from "./api/cart.service";
import { checkCookie } from "./utils/cookies";
import useCartMutation from "./hooks/useCartMutation";
import { setCartTotals } from "./store/features/cartTotalsSlice";

function App() {

  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const sessionId = checkCookie();
  const cart = useSelector((state: RootState) => state.cart);
  console.log("cart", cart);

  useEffect(() => {
    dispatch(setPage(Number(searchParams.get("page") ?? 1)));
    dispatch(setSearchValue(searchParams.get("search") ?? ""));
  }, [searchParams]);
  
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) dispatch(setUser(decodeToken(token)));
  }, []);
  

  useEffect(() => {
    dispatch(setCartTotals(cart))
  }, [cart])


  const { data: currentCart, isSuccess } = useQuery<CartType>({
    queryKey: ["cart", sessionId],
    queryFn: () => getCartBySesionId(sessionId),
  });

  useEffect(() => {
    if (isSuccess && currentCart) {
      dispatch(setCart(currentCart.puzzles))
    }
  }, [isSuccess])
  
  useCartMutation()


  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
