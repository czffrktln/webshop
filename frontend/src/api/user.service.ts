import { UserLoginFormType } from "../components/LoginForm";
import { UserRegistrationFormType } from "../components/SignUpForm";

export async function registerUser(userData: UserRegistrationFormType) {
  const response = await fetch("http://localhost:3000/user/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
}

export async function loginUser(userData: UserLoginFormType) {
  const response = await fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
}
