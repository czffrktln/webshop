import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExtensionIcon from "@mui/icons-material/Extension";

export default function Header() {
  return (
    <AppBar>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ExtensionIcon />
          <Typography variant="h5" sx={{ cursor: "pointer" }}>
            PuzzleShop
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <ShoppingCartIcon sx={{ fontSize: 25, cursor: "pointer" }} />

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
        </Box>
      </Toolbar>
    </AppBar>
  );
}
