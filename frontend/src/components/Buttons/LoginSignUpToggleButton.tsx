import { Button } from "@mui/material";

interface LoginSignUpToggleButtonPropsType {
  buttonText: string;
  setIsNewUserLogin: (value: boolean) => void;
  isNewUserLoginValue: boolean;
}

export default function LoginSignUpToggleButton({
  buttonText,
  setIsNewUserLogin,
  isNewUserLoginValue,
}: LoginSignUpToggleButtonPropsType) {
  return (
    <Button
      sx={{
        color: "primary.main",
        textDecoration: "underline",
        backgroundColor: "transparent",
        "&:hover": {
          textDecoration: "underline",
          color: "secondary.main",
        },
      }}
      onClick={() => setIsNewUserLogin(isNewUserLoginValue)}
    >
      {buttonText}
    </Button>
  );
}
