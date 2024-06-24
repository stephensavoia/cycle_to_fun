import { ReactNode, createContext, useContext } from "react";

type UserContextType = {
  userId: string | null;
  username: string | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: UserContextType;
}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
