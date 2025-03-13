import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Link,
  Box,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { googleLoginUrl } from "../utils/constants";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { decodeToken } from "../utils/decodeToken";
import axios from "axios";
import { UserContext } from "../context/UserContext";

import LoginSignUpToggleButton from "./Buttons/LoginSignUpToggleButton";

interface SignInFormPropsType {
  handleCloseModal: () => void;
  style: {};
  setIsNewUserLogin: (value: boolean) => void;
}

export const UserLoginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Email format is not correct")
    .transform((value) => value.toLowerCase()),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

export type UserLoginFormType = z.infer<typeof UserLoginFormSchema>;

export default function LoginForm({
  style,
  handleCloseModal,
  setIsNewUserLogin,
}: SignInFormPropsType) {
  const [authenticationError, setAuthenticationError] = useState(false);
  const { setUser } = useContext(UserContext);

  const { control, formState, handleSubmit, reset, watch } =
    useForm<UserLoginFormType>({
      defaultValues: {
        email: "",
        password: "",
      },
      resolver: zodResolver(UserLoginFormSchema),
    });

  const watchEmail = watch("email");
  const watchPassword = watch("password");

  const onLoginSubmit = async (data: UserLoginFormType) => {
    console.log("data", data);
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        data,
      });
      console.log("loginos response", response);
      sessionStorage.setItem("token", response.data);
      setUser(decodeToken(response.data));
      reset();
      handleCloseModal();
    } catch (error: any) {
      if (error.status === 403) setAuthenticationError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    setAuthenticationError(false);
  }, [watchEmail, watchPassword]);

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onLoginSubmit)}
        sx={{
          ...style,
          width: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">LOGIN</Typography>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormControl sx={{ width: "90%", marginBottom: "10px" }}>
              <FormLabel>Email</FormLabel>
              <TextField
                size="small"
                {...field}
                required
                type="email"
                error={!!formState.errors.email}
                helperText={formState.errors.email?.message?.toString()}
                color={formState.errors.email ? "error" : "primary"}
              />
            </FormControl>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormControl sx={{ width: "90%", marginBottom: "10px" }}>
              <FormLabel>Password</FormLabel>
              <TextField
                size="small"
                {...field}
                required
                type="password"
                error={!!formState.errors.password}
                helperText={formState.errors.password?.message?.toString()}
                color={formState.errors.password ? "error" : "primary"}
              />
              {authenticationError && (
                <Typography variant="caption" color="secondary.main">
                  Invalid email or password.
                </Typography>
              )}
            </FormControl>
          )}
        />

        <Button variant="contained" type="submit" sx={{ marginBottom: "10px" }}>
          LOGIN
        </Button>
        <Divider sx={{ width: "90%", marginBottom: "10px" }}>
          <Typography variant="caption">OR</Typography>
        </Divider>
        <Link href={googleLoginUrl}>
          <Button
            startIcon={<GoogleIcon sx={{ color: "secondary.main" }} />}
            variant="contained"
            sx={{ marginBottom: "10px" }}
          >
            Login with Google
          </Button>
        </Link>

        <Typography variant="caption">
          <LoginSignUpToggleButton
            buttonText={"Sign Up"}
            setIsNewUserLogin={setIsNewUserLogin}
            isNewUserLoginValue={true}
          />
        </Typography>
      </Box>
    </>
  );
}
