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
import { UserContext } from "../context/UserContext";
import LoginSignUpToggleButton from "./Buttons/LoginSignUpToggleButton";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/user.service";

interface SignUpFormPropsType {
  handleCloseModal: () => void;
  modalStyle: object;
  setIsNewUserLogin: (value: boolean) => void;
}

export const UserRegistrationFormSchema = z.object({
  name: z.string().trim().min(2, "Name should be at least 2 characters"),
  email: z
    .string()
    .trim()
    .email("Email format is not correct")
    .transform((value) => value.toLowerCase()),
  password: z
    .string()
    .trim()
    .min(6, "Password should be at least 6 characters"),
});

export type UserRegistrationFormType = z.infer<
  typeof UserRegistrationFormSchema
>;

export default function SignUpForm({
  modalStyle,
  handleCloseModal,
  setIsNewUserLogin,
}: SignUpFormPropsType) {
  const [emailError, setEmailError] = useState(false);
  const { setUser } = useContext(UserContext);

  const { control, formState, handleSubmit, reset, watch } =
    useForm<UserRegistrationFormType>({
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
      resolver: zodResolver(UserRegistrationFormSchema),
    });

  const watchEmail = watch("email");

  const onNewUserSubmitMutation = useMutation({
    mutationFn: (userData: UserRegistrationFormType) => registerUser(userData),

    onSuccess: (response) => {
      sessionStorage.setItem("token", response);
      setUser(decodeToken(response));
      reset();
      handleCloseModal();
    },
    onError: (error: string) => {
      console.log(error);
      setEmailError(true)
    },
  });

  const onNewUserSubmit = (data: UserRegistrationFormType) => {
    onNewUserSubmitMutation.mutate(data);
  };

  useEffect(() => {
    setEmailError(false);
  }, [watchEmail]);

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onNewUserSubmit)}
        sx={{...modalStyle, ...style.modalWindow}}
      >
        <Typography variant="h6">SIGN UP</Typography>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <FormControl sx={style.formElementSize}>
              <FormLabel>Name</FormLabel>
              <TextField
                size="small"
                {...field}
                required
                sx={{ width: "100%" }}
                error={!!formState.errors.name}
                helperText={formState.errors.name?.message?.toString()}
                color={formState.errors.name ? "error" : "primary"}
              />
            </FormControl>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormControl sx={style.formElementSize}>
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
              {emailError && (
                <Typography variant="caption" color="secondary.main">
                  This email address has already been used
                </Typography>
              )}
            </FormControl>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormControl sx={style.formElementSize}>
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
            </FormControl>
          )}
        />

        <Button variant="contained" type="submit" sx={{ marginBottom: "10px" }}>
          SIGN UP
        </Button>
        <Divider sx={style.formElementSize}>
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
            buttonText={"Login"}
            setIsNewUserLogin={setIsNewUserLogin}
            isNewUserLoginValue={false}
          />
        </Typography>
      </Box>
    </>
  );
}

const style = {
  modalWindow: {
    width: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formElementSize: {
    width: "90%", marginBottom: "10px"
  }
};
