import { createContext, useState, useEffect } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTermMovies, setSearchTermMovies] = useState("");
  const [searchTermSavedMovies, setSearchTermSavedMovies] = useState("");
  const [switcherMode, setSwitcherMode] = useState(false);
  const [switcherModeSaved, setSwitcherModeSaved] = useState(false);

  const setSearchTermMoviesValue = (value) => {
    setSearchTermMovies(value);
  };

  return (
    <SearchContext.Provider
      value={{
        setSearchTermSavedMovies,
        setSwitcherMode,
        setSwitcherModeSaved,
        switcherModeSaved,
        switcherMode,
        searchTermMovies,
        setSearchTermMovies,
        setSearchTermMoviesValue,
        searchTermSavedMovies,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
