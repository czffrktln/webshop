import React, { createContext, useEffect, useState } from "react";
import { decodeToken } from "../utils/decodeToken";

import { UserType } from "../types";

export interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

const defaultState: UserContextType = {
  user: null,
  setUser: () => {},
};

export const UserContext = createContext(defaultState);

type UserProviderProps = {
  children: React.ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {

  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) setUser(decodeToken(token))
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
