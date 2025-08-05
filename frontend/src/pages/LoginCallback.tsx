import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BouncyLoader from "../components/BouncyLoader";

import { decodeToken } from "../utils/decodeToken";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setUser } from "../store/features/userSlice";

export default function LoginCallback() {
  const navigate = useNavigate();
  const hasSentCode = useRef(false);

  const dispatch = useDispatch<AppDispatch>();

  const urlSearchParams = new URLSearchParams(window.location.search);
  const googleCode = urlSearchParams.get("code");

  const sendCode = async () => {
    if (hasSentCode.current) return;
    hasSentCode.current = true;

    const response = await axios.post("http://localhost:3000/login", {
      code: googleCode,
    });
    sessionStorage.setItem("token", response.data);
    dispatch(setUser(decodeToken(response.data)));

    navigate("/");
  };

  useEffect(() => {
    sendCode();
  }, []);

  return <BouncyLoader />;
}
