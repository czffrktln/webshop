import { Snackbar, SnackbarContent, SnackbarOrigin } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setSnackbar } from "../store/features/snackbarSlice";

export interface SnackbarState extends SnackbarOrigin {
  open: boolean,
  message: string
}

interface SnackBarProps {
  style: { bgcolor: string; color: string };
}

export default function SnackBarComponent({style}: SnackBarProps) {

  const snackbarState = useSelector((state: RootState) => state.snackbar)
  const { vertical, horizontal, open, message } = snackbarState;

  const dispatch = useDispatch<AppDispatch>()

  const handleSnackbarClose = () => {
    dispatch(setSnackbar({open: false, message: ""}));
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
