import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Product from "./pages/Product.tsx";
import LoginCallback from "./pages/LoginCallback.tsx";
import { PuzzleProvider } from "./context/PuzzleContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#44656e",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9BC4CB",
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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <PuzzleProvider>
        <RouterProvider router={router} />
      </PuzzleProvider>
    </ThemeProvider>
  </StrictMode>
);
