import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BouncyLoader from "../components/BouncyLoader";
import { UserContext } from "../context/UserContext";
import { decodeToken } from "../utils/decodeToken";

export default function LoginCallback() {
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
    <BouncyLoader />
  );
}
