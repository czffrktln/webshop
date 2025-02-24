import React, { createContext, useState } from "react";

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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
