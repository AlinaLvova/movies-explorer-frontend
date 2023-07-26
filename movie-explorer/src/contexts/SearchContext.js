import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTermMovies, setSearchTermMovies] = useState("");
  const [searchTermSavedMovies, setSearchTermSavedMovies] = useState("");
  const [switcherMode, setSwitcherMode] = useState(false);
  const [switcherModeSaved, setSwitcherModeSaved] = useState(false);

  const resetSearchTermsContext = () => {
    setSearchTermMovies("");
    setSearchTermSavedMovies("");
    setSwitcherMode(false);
    setSwitcherModeSaved(false);
  };

  const setSearchTermMoviesValue = (value) => {
    setSearchTermMovies(value);
  };

  function setTerms() {
    const [term, mode] = installLocalCopy("options-beatfilm-movies");
    setSearchTermMovies(term);
    setSwitcherMode(mode);
    setSearchTermSavedMovies("");
    setSwitcherModeSaved(false);
  }

  function installLocalCopy(localStorageName) {
    const optionsLocalCopy = JSON.parse(localStorage.getItem(localStorageName));
    if (optionsLocalCopy) {
      const mode = optionsLocalCopy.switcherMode
        ? optionsLocalCopy.switcherMode
        : false;
      const term = optionsLocalCopy.searchQuery
        ? optionsLocalCopy.searchQuery
        : "";
      return [term, mode];
    } else {
      return ["", false];
    }
  }

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
        setTerms,
        resetSearchTermsContext,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
