import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../context/UserContext";
import { UserType } from "../types";
import { useNavigate } from "react-router-dom";
import { bouncy } from "ldrs";
import { Box, Grid2 } from "@mui/material";

export default function LoginCallback() {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  bouncy.register();

  console.log("logincallback render");

  const hasSentCode = useRef(false);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const googleCode = urlSearchParams.get("code");

  const sendCode = async () => {
    if (hasSentCode.current) return;
    hasSentCode.current = true;
    console.log("sendcode fut");

    const response = await axios.post("http://localhost:3000/login", {
      code: googleCode,
    });
    console.log("response", response);
    const decodedToken = jwtDecode(response.data) as UserType;
    console.log("decodedToken", decodedToken);

    const { email, given_name, name, picture, sub, _id } = decodedToken;
    setUser({ email, given_name, name, picture, sub, _id });
    navigate("/");
  };

  console.log("user", user);
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
