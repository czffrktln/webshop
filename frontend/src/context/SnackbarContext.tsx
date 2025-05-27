import { createContext, Dispatch, SetStateAction, useState } from "react";
import { SnackbarOrigin } from "@mui/material/Snackbar";

interface SnackbarState extends SnackbarOrigin {
  open: boolean;
}

interface SnackbarContextType {
  snackbarState: SnackbarState;
  setSnackbarState: (snackbarState: SnackbarState) => void;
  snackbarMessage: string,
  setSnackbarMessage: Dispatch<SetStateAction<string>>
}

const defaultState: SnackbarContextType = {
  snackbarState: {
    open: false,
    vertical: "top",
    horizontal: "center",
  },
  // setSnackbarState: () => {},
};

const messageDefaultState = {
  snackbarMessage: "",
  setSnackbarMessage: () => {}

}

export const SnackbarContext = createContext(defaultState);

type SnackbarProviderProps = {
  children: React.ReactNode;
};

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>(defaultState);
  const [ snackbarMessage, setSnackbarMessage ] = useState("")

  return (
    <SnackbarContext.Provider value={{ snackbarState, snackbarMessage, setSnackbarMessage }}>
      {children}
    </SnackbarContext.Provider>
  );
}
