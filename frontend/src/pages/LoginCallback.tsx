import axios from "axios"
import { useEffect, useRef } from "react"

export default function LoginCallback() {

  console.log("logincallback render");
  
  const hasSentCode = useRef(false)
  
  const urlSearchParams = new URLSearchParams(window.location.search)
  const googleCode = urlSearchParams.get("code")

  const sendCode = async () => {
    if (hasSentCode.current) return
    hasSentCode.current = true;
    console.log("sendcode fut");
    
    const response = await axios.post("http://localhost:3000/login", {
      code: googleCode
    })
    console.log("response", response);
  }

  useEffect(() => {
    sendCode()
  }, [])

  return (
    <>
      <h1 style={{marginTop: "100px"}}>{googleCode}</h1>
    </>
  )
}