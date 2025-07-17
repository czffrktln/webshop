import "./App.css";

import { PageProvider } from "./context/PageContext";
import Header from "./components/Header";
import { Outlet, useSearchParams } from "react-router-dom";
import { SearchValueProvider } from "./context/SearchValueContext";
import { SnackbarProvider } from "./context/SnackbarContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { useEffect } from "react";
import { setPage } from "./store/features/pageSlice";

function App() {
  const [searchParams] = useSearchParams();

  const page = useSelector((state: RootState) => state.page);
  const dispatch = useDispatch<AppDispatch>();

  console.log("page", page);
  console.log("useparams", searchParams.get("page"));

  useEffect(() => {
    dispatch(setPage(Number(searchParams.get("page") ?? 1)));
  }, [searchParams]);

  return (
    <div className="app">
      <SnackbarProvider>
        <SearchValueProvider>
          <PageProvider>
            <Header />
            <Outlet />
          </PageProvider>
        </SearchValueProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
