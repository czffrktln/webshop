import "./App.css";
import axios from "axios";

function App() {
  axios
    .get("http://localhost:3000")
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <>
      <h1>webshop</h1>
    </>
  );
}

export default App;
