import "./App.css";

import { PageProvider } from "./context/PageContext";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { SearchValueProvider } from "./context/SearchValueContext";


function App() {

  return (
    <div className="app">
      <SearchValueProvider>
        <PageProvider>
          <Header />
          <Outlet />
        </PageProvider>
      </SearchValueProvider>
    </div>
  );
}

export default App;
