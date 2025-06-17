// import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Product from "./pages/Product.tsx";
import LoginCallback from "./pages/LoginCallback.tsx";
import { PuzzleProvider } from "./context/PuzzleContext";
import { UserProvider } from "./context/UserContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import Cart from "./pages/Cart.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Orders from "./pages/Orders.tsx";

const queryClient = new QueryClient();

// #EF959D lazac
// #E7F59E cetli
// #A5BE00 alma

const theme = createTheme({
  palette: {
    primary: {
      main: "#44656e",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9BC4CB",
    },
    warning: {
      main: "#EF959D",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "callback",
        element: <LoginCallback />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/orders/:id",
        element: <Orders />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <UserProvider>
          <PuzzleProvider>
            <RouterProvider router={router} />
          </PuzzleProvider>
        </UserProvider>
      </CartProvider>
    </QueryClientProvider>
  </ThemeProvider>
  // </StrictMode>
);
