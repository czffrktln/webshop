import { v4 as uuidv4 } from "uuid";

export function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname: string) {
  const name = cname + "=";
  // const decodedCookie = decodeURIComponent(document.cookie);
  const decodedCookie = document.cookie;
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function checkCookie() {
  const sessionId = getCookie("sessionId");
  if (sessionId != "") {
    return sessionId;
  } else {
    setCookie("sessionId", uuidv4(), 1);
    return getCookie("sessionId");
  }
}
