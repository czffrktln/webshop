import "./App.css";
import Header from "./components/Header";
import { Outlet, useSearchParams } from "react-router-dom";
import { SearchValueProvider } from "./context/SearchValueContext";
import { SnackbarProvider } from "./context/SnackbarContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { useEffect } from "react";
import { setPage } from "./store/features/pageSlice";

function App() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setPage(Number(searchParams.get("page") ?? 1)));
  }, [searchParams]);

  return (
    <div className="app">
      <SnackbarProvider>
        <SearchValueProvider>
            <Header />
            <Outlet />
        </SearchValueProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
