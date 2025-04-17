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

const style = {
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

  const handleLogout = () => {
    setAnchorEl(null);
    setUser(null);
    setCart([]);
    sessionStorage.removeItem("token");
    navigate("/");
  };

  function handleHomePageRedirect() {
    navigate("/");
    setPage(1);
  }

  return (
    <AppBar sx={{ position: "static" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          onClick={handleHomePageRedirect}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <ExtensionIcon />
          <Typography variant="h5" sx={{ cursor: "pointer" }}>
            PuzzleShop
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 3, md: 4 },
          }}
        >
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
              <Modal open={open} onClose={handleCloseModal}>
                <>
                  {isNewUserLogin ? (
                    <SignUpForm
                      style={style}
                      handleCloseModal={handleCloseModal}
                      setIsNewUserLogin={setIsNewUserLogin}
                    />
                  ) : (
                    <LoginForm
                      style={style}
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
