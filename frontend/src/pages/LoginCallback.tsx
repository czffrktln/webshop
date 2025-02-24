import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../context/UserContext";
import { UserType } from "../types";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

export default function LoginCallback() {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

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
    <>
      <img src="https://cdn-icons-gif.flaticon.com/17905/17905768.gif" />
    </>
  );
}
