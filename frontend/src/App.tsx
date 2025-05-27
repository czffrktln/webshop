import "./App.css";

import { PageProvider } from "./context/PageContext";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { SearchValueProvider } from "./context/SearchValueContext";
import { SnackbarProvider } from "./context/SnackbarContext";

function App() {
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
