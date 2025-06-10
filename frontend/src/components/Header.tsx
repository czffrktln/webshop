import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Modal,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExtensionIcon from "@mui/icons-material/Extension";
import PersonIcon from "@mui/icons-material/Person";

import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { PageContext } from "../context/PageContext";
import { SearchValueContext } from "../context/SearchValueContext";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: 4,
};

export default function Header() {
  const navigate = useNavigate();
  const { setPage } = useContext(PageContext);
  const { setSearchValue } = useContext(SearchValueContext)
  const { user, setUser } = useContext(UserContext);
  const { numberOfItems, setCart } = useContext(CartContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isNewUserLogin, setIsNewUserLogin] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
    setIsNewUserLogin(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    setAnchorEl(null)
    if (user) {
      navigate(`/profile/${user._id}`)
    }
  }

  const handleLogout = () => {
    navigate("/");
    setAnchorEl(null);
    setUser(null);
    setCart([]);
    sessionStorage.removeItem("token");
  };

  function handleHomePageRedirect() {
    navigate("/");
    setSearchValue("")
    setPage(1);
  }

  return (
    <AppBar sx={{ position: "static" }}>
      <Toolbar sx={style.toolbar}>
        <Box
          onClick={handleHomePageRedirect}
          sx={style.logo}
        >
          <ExtensionIcon />
          <Typography variant="h5" sx={style.logoText}>
            PuzzleShop
          </Typography>
        </Box>

        <Box sx={style.cartAndUser}>
          <IconButton
            sx={style.iconButton}
            onClick={() => navigate("/cart")}
          >
            <Badge
              badgeContent={numberOfItems}
              color="secondary"
              sx={style.cartBadge}
            >
              <ShoppingCartIcon sx={style.shoppingCartIcon} />
            </Badge>
          </IconButton>
          {user ? (
            <Box sx={style.user}>
              <Typography>{user.given_name}</Typography>
              <IconButton onClick={handleMenu}>
                <PersonIcon sx={style.iconButton} />
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
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <>
              <Button
                onClick={handleOpen}
                variant="text"
                sx={style.loginButton}
              >
                Login
              </Button>
              <Modal open={open} onClose={handleCloseModal}>
                <>
                  {isNewUserLogin ? (
                    <SignUpForm
                      modalStyle={modalStyle}
                      handleCloseModal={handleCloseModal}
                      setIsNewUserLogin={setIsNewUserLogin}
                    />
                  ) : (
                    <LoginForm
                      modalStyle={modalStyle}
                      handleCloseModal={handleCloseModal}
                      setIsNewUserLogin={setIsNewUserLogin}
                    />
                  )}
                </>
              </Modal>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

const style = {
  toolbar: {
    display: "flex", 
    justifyContent: "space-between"
  },
  logo: {
    display: "flex", 
    alignItems: "center", 
    gap: 1,
  },
  logoText: {
    cursor: "pointer"
  },
  cartAndUser: {
    display: "flex",
    alignItems: "center",
    gap: { xs: 1, sm: 3, md: 4 },
  },
  cartBadge: {
    "& .MuiBadge-badge": { fontSize: 10, height: 15, minWidth: 15 }
  },
  shoppingCartIcon: {
    fontSize: 25, 
    cursor: "pointer"
  },
  iconButton: {
    color: "primary.contrastText"
  },
  user: {
    display: "flex", 
    gap: 1, 
    alignItems: "center",
  },
  loginButton: {
    color: "primary.contrastText",
   "&:focus ": {
      outline: "none",
   },
  }
}
