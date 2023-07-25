import { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    "emails" : "",
    "name" : "",
  });

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
