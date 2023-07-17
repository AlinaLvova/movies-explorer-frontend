import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const setSearchTermValue = (value) => {
    setSearchTerm(value);
  };

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, setSearchTermValue}}>
      {children}
    </SearchContext.Provider>
  );
};
