import { Snackbar, SnackbarContent, SnackbarOrigin } from "@mui/material";

interface SnackbarState extends SnackbarOrigin {
  open: boolean;
}

interface SnackBarProps {
  message: string;
  style: { bgcolor: string; color: string };
  snackbarState: SnackbarState;
  setSnackbarState: (newstate: SnackbarState) => void;
}

export default function SnackBarComponent({
  message,
  style,
  snackbarState,
  setSnackbarState,
}: SnackBarProps) {
  const { vertical, horizontal, open } = snackbarState;

  const handleSnackbarClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleSnackbarClose}
      key={vertical + horizontal}
      autoHideDuration={5000}
    >
      <SnackbarContent sx={style} message={message} />
    </Snackbar>
  );
}
