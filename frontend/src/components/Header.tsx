import { AppBar, Toolbar, Typography, Button, Box, Link } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExtensionIcon from "@mui/icons-material/Extension";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const googleLink = "https://accounts.google.com/o/oauth2/v2/auth"
  const clientId = "792684856006-ss8nuq7c2rokb0vu9cadmjnb2pnkohig.apps.googleusercontent.com"
  const redirectUri = "http://localhost:5173/callback"
  const scope = "openid%20email%20profile"
  const responseType = "code"
  
  const googleLoginUrl = `${googleLink}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&prompt=consent`
  

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
          <ShoppingCartIcon sx={{ fontSize: 25, cursor: "pointer" }} />
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}
