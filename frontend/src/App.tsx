import "./App.css";

import { PageProvider } from "./context/PageContext";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";


function App() {

  return (
    <div className="app">
      <PageProvider>
        <Header />
        <Outlet />
      </PageProvider>
    </div>
  );
}

export default App;
