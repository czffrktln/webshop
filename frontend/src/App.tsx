import "./App.css";
import Header from "./components/Header";
import { Outlet, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { useEffect } from "react";
import { setPage } from "./store/features/pageSlice";
import { setSearchValue } from "./store/features/searchValueSlice";

function App() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setPage(Number(searchParams.get("page") ?? 1)));
    dispatch(setSearchValue(searchParams.get("search") ??  ""))
  }, [searchParams]);

  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
