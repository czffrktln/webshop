import "./App.css";

import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { checkCookie} from "./utils/cookies";
import { useEffect } from "react";

function App() {

  // useEffect(() => {
  //   checkCookie()

  // }, [])
  

  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
