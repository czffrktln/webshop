import { createContext, useState } from "react";
import { SnackbarOrigin } from "@mui/material/Snackbar";

interface SnackbarState extends SnackbarOrigin {
  open: boolean;
}

interface SnackbarContextType {
  snackbarState: SnackbarState;
  setSnackbarState: (value: SnackbarState) => void;
  snackbarMessage: string;
  setSnackbarMessage: (value: string) => void;
}

const defaultState: SnackbarContextType = {
  snackbarState: {
    open: false,
    vertical: "top",
    horizontal: "center",
  },
  setSnackbarState: (value) => value,
  snackbarMessage: "",
  setSnackbarMessage: (newMessage) => newMessage,
};

export const SnackbarContext = createContext(defaultState);

type SnackbarProviderProps = {
  children: React.ReactNode;
};

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [snackbarMessage, setSnackbarMessage] = useState("");

  console.log("snacki context open:", snackbarState.open);
  return (
    <SnackbarContext.Provider
      value={{
        snackbarState,
        setSnackbarState,
        snackbarMessage,
        setSnackbarMessage,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
}
