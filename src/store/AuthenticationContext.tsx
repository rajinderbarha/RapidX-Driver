import { createContext, PropsWithChildren, useContext, useState } from "react";

interface AuthenticationContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isApproved: boolean;
  setIsApproved: (value: boolean) => void;
}

export const AuthenticationContext = createContext<AuthenticationContextInterface>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isApproved : false,
  setIsApproved : ()=>{}

});

export default function AuthenticationContextProvider({
  children,
}: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    isApproved,
    setIsApproved
  };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export const useAuth = ()=> useContext(AuthenticationContext);
