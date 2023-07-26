import { createContext, useState, useEffect} from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    "emails" : "",
    "name" : "",
  });

  const resetCurrentUserContext = () => {
    setCurrentUser({
      "emails" : "",
      "name" : "",
    });
  };

  useEffect(() => {
    setCurrentUser({
      "emails" : "",
      "name" : "",
    });
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        resetCurrentUserContext
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
