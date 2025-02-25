import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
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
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExtensionIcon from "@mui/icons-material/Extension";
import PersonIcon from "@mui/icons-material/Person";

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const googleLink = "https://accounts.google.com/o/oauth2/v2/auth";
  const clientId =
    "792684856006-ss8nuq7c2rokb0vu9cadmjnb2pnkohig.apps.googleusercontent.com";
  const redirectUri = "http://localhost:5173/callback";
  const scope = "openid%20email%20profile";
  const responseType = "code";

  const googleLoginUrl = `${googleLink}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&prompt=consent`;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    setUser(null)
    navigate("/")
  };

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

        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <IconButton sx={{ color: "primary.contrastText" }}>
            <ShoppingCartIcon sx={{ fontSize: 25, cursor: "pointer" }} />
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
            <Link href={googleLoginUrl}>
              <Button
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
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
