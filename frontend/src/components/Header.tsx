import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
// import { googleLoginUrl } from "../utils/constants";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Link,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Modal,
  FormControl,
  TextField,
  InputLabel,
  FormLabel,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExtensionIcon from "@mui/icons-material/Extension";
import PersonIcon from "@mui/icons-material/Person";
import axios, { AxiosError } from "axios";

const UserRegistrationFormSchema = z.object({
  name: z.string().min(2, 'Name should be at least 2 characters'),
  email: z.string().email('Email format is not correct').transform((value) => value.toLowerCase()),
  password: z.string().min(6, 'Password should be at least 6 characters')
});

type UserRegistrationFormType = z.infer<typeof UserRegistrationFormSchema>;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 500,
  // width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  padding: 4,
  // display:"flex" ,
  // flexDirection: "column",
  // justifyContent: "center",
  
};

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { numberOfItems, setCart } = useContext(CartContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [ emailError, setEmailError ] = useState(false)
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    setUser(null);
    setCart([])
    sessionStorage.removeItem("cart")
    sessionStorage.removeItem("token")
    navigate("/");
  };

  const {control, handleSubmit, formState, reset, watch} = useForm<UserRegistrationFormType>({
    defaultValues: {
      name: "", 
      email: "",
      password: ""
    },
    resolver: zodResolver(UserRegistrationFormSchema)
  })

  const watchEmail = watch("email")

  const onNewUserSubmit = async (data: UserRegistrationFormType) => {
    console.log("data", data);
    try {
      const response = await axios.post("http://localhost:3000/user/registration", {
        data
      })
      console.log("response", response);
      reset()
      handleCloseModal()

    }
    catch (error) {
      if (error.status === 403) setEmailError(true)
      console.log(error);
    }
    // if (response.status === 403) console.log("haha");
  };

  useEffect(() => {
    setEmailError(false)
  }, [watchEmail])

  return (
    <AppBar>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          onClick={() => navigate("/")}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <ExtensionIcon />
          <Typography variant="h5" sx={{ cursor: "pointer" }}>
            PuzzleShop
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 3, md: 4 } }}>
          <IconButton
            sx={{ color: "primary.contrastText" }}
            onClick={() => navigate("/cart")}
          >
            <Badge
              badgeContent={numberOfItems}
              color="secondary"
              sx={{
                "& .MuiBadge-badge": { fontSize: 10, height: 15, minWidth: 15 },
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 25, cursor: "pointer" }} />
            </Badge>
          </IconButton>
          {user ? (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Typography>{user.given_name}</Typography>
              <IconButton onClick={handleMenu}>
                <PersonIcon sx={{ color: "primary.contrastText" }} />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            // <Link href={googleLoginUrl}>
            <>
        
              <Button
                onClick={handleOpen}
                variant="text"
                sx={{
                  color: "primary.contrastText",
                  "&:focus ": {
                    outline: "none",
                  },
                }}
              >
                Login
              </Button>
              <Modal
                open={open}
                onClose={handleCloseModal}
                // sx={{maxWidth: 400}}
              >
                <Box 
                  
                  component="form" 
                  onSubmit={handleSubmit(onNewUserSubmit)}
                  sx={{...style, 
                  width: 400, 
                  display: "flex", 
                  flexDirection: "column", 
                  // justifyContent: "center",
                  alignItems: "center",

                }}>
                  {/* <Box>
                    <Typography>LOGIN</Typography>
                  <Typography variant="caption">REGISTRATION</Typography>
   

                  </Box> */}

    
                  <Typography variant="h6">SIGN UP</Typography>
                  <Controller
                    name="name"
                    control={control}
                    render={({field}) => (
                      <FormControl
                        sx={{ width: "90%"}}
                      >
                        <FormLabel>Name</FormLabel>
                        <TextField 
                          {...field}
                          required
                          // fullWidth
                          sx={{ width: "100%" }}
                          error={!!formState.errors.name}
                          helperText={formState.errors.name?.message?.toString()}
                          color={formState.errors.name ? 'error' : 'primary'}
                        />
                      </FormControl>

                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    render={({field}) => (
                      <FormControl
                        sx={{ width: "90%"}}
                      >
                        <FormLabel>Email</FormLabel>
                        <TextField 
                          {...field}
                          required
                          type="email"
                          error={!!formState.errors.email}
                          helperText={formState.errors.email?.message?.toString()}
                          color={formState.errors.email ? 'error' : 'primary'}
                        />
                        { emailError && 
                        <Typography variant="caption" color="secondary.main">This email address has already been used</Typography> }
                      </FormControl>

                    )}
                  />
                  <Controller
                    name="password"
                    control={control}
                    render={({field}) => (
                      <FormControl
                      sx={{ width: "90%"}}
                      >
                        <FormLabel>Password</FormLabel>
                        <TextField 
                          {...field}
                          required
                          type="password"
                          error={!!formState.errors.password}
                          helperText={formState.errors.password?.message?.toString()}
                          color={formState.errors.password ? 'error' : 'primary'}
                        />
                      </FormControl>

                    )}
                  />

                  
                  <Button variant="contained" type="submit">SIGN UP</Button>
                  <Typography variant="caption">SIGN IN</Typography>

          
    
                </Box>
              </Modal>
            {/* // </Link> */}
                </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
