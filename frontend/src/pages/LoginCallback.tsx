import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { bouncy } from "ldrs";
import { UserContext } from "../context/UserContext";
import { decodeToken } from "../utils/decodeToken";
import { Grid2 } from "@mui/material";

export default function LoginCallback() {
  bouncy.register();
  
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const hasSentCode = useRef(false);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const googleCode = urlSearchParams.get("code");

  const sendCode = async () => {
    if (hasSentCode.current) return;
    hasSentCode.current = true;

    const response = await axios.post("http://localhost:3000/login", {
      code: googleCode,
    });
    sessionStorage.setItem("token", response.data)
    setUser(decodeToken(response.data))
    navigate("/");
  };

  useEffect(() => {
    sendCode();
  }, []);

  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <l-bouncy size="100" speed="1.75" color="#44656e"></l-bouncy>
    </Grid2>
  );
}
