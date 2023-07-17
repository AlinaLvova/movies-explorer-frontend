import { createContext, useState } from "react";

export const PreloaderContext = createContext();

export const PreloaderProvider = ({ children }) => {
  const [isActivePreloader, setIsActivePreloader] = useState(false);

  const setStatePreloader = (value) => {
    setIsActivePreloader(value);
  };

  return (
    <PreloaderContext.Provider value={{ isActivePreloader, setStatePreloader}}>
      {children}
    </PreloaderContext.Provider>
  );
};
