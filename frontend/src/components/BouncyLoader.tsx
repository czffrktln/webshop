import { Grid2 } from "@mui/material";
import { bouncy } from "ldrs";

function BouncyLoader() {

  bouncy.register();

  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <l-bouncy size="100" speed="1.75" color="#44656e"></l-bouncy>
    </Grid2>
  )
}

export default BouncyLoader;