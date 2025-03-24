import "./App.css";

import { v4 as uuidv4 } from 'uuid';

import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {

  // console.log("elotte,", sessionStorage.getItem("sessionId"));
  if (!localStorage.getItem("sessionId")) localStorage.setItem("sessionId", uuidv4())
  console.log("utana", localStorage.getItem("sessionId"));
    

  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
