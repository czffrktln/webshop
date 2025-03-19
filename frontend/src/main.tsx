import { StrictMode } from "react";
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

const queryClient = new QueryClient()

const theme = createTheme({
  palette: {
    primary: {
      main: "#44656e",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9BC4CB",
    },
  }
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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CartProvider>
        <UserProvider>
          <PuzzleProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </PuzzleProvider>
        </UserProvider>
      </CartProvider>
    </ThemeProvider>
  </StrictMode>
);
