import "./App.css";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { MovieProvider } from "../../contexts/MovieContext";
import Header from "../Common/Header/Header";
import Menu from "../Common/Header/Menu/Menu";
import Footer from "../Common/Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import movieList from "../../utils/movieList";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [prevPathname, setPrevPathname] = useState("");
  const [visibleRowsMovies, setVisibleRowsMovies] = useState(2);
  const [visibleRowsSavedMovies, setVisibleRowsSavedMovies] = useState(2);
  const [cards, setCards] = useState([]);
  const location = useLocation();

  //переход между этими двумя роутами не сворачивает уже открывшиеся фильмы. (перенести в контекст)
  useEffect(() => {
    const pathname = location.pathname;
    if (
      (prevPathname === "/movies" || prevPathname === "") &&
      pathname === "/saved-movies"
    ) {
      setIsExpanded(true);
    } else if (
      (prevPathname === "/saved-movies" || prevPathname === "") &&
      pathname === "/movies"
    ) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
      deleteRowsCounters();
    }
    setPrevPathname(pathname);
  }, [location.pathname]);

  const handleVisibleRowsMovies = () => {
    setVisibleRowsMovies(visibleRowsMovies + 1);
  };

  const handleVisibleRowsSavedMovies = () => {
    setVisibleRowsSavedMovies(visibleRowsSavedMovies + 1);
  };

  const deleteRowsCounters = () => {
    setVisibleRowsMovies(2);
    setVisibleRowsSavedMovies(2);
  };

  useEffect(() => {
    setCards(movieList);
  }, []);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const closeAllPopups = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="page">
      <div className="page__container">
        <MovieProvider>
          <Header onClickMenuButton={handleOpenMenu}></Header>
          <main className="content">
            <Routes>
              <Route
                path="*"
                element={
                  loggedIn ? (
                    <Navigate to="/movies" replace />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              ></Route>
              <Route
                exact
                path="/signin"
                // element={<Login onLogin={handleLogin} />}
              ></Route>
              <Route
                exact
                path="/signup"
                // element={<Register onRegister={handleLogin} />}
              ></Route>
              <Route
                exact
                path="/profile"
                // element={}
              ></Route>
              <Route
                exact
                path="/movies"
                element={
                  <Movies
                    cards={cards}
                    rows={visibleRowsMovies}
                    isExpanded={isExpanded}
                    onRowsCounter={handleVisibleRowsMovies}
                  />
                }
              ></Route>
              <Route
                path="/saved-movies"
                element={
                  <SavedMovies
                    isExpanded={isExpanded}
                    rows={visibleRowsSavedMovies}
                    onRowsCounter={handleVisibleRowsSavedMovies}
                  />
                }
              ></Route>
              <Route
                path="/404"
                // element={
                //    <ProtectedRouteElement />
                // }
              ></Route>
              <Route path="/" element={<Main />}></Route>
            </Routes>
          </main>
          <Footer />
          <Menu isOpen={isMenuOpen} onClose={closeAllPopups} />
        </MovieProvider>
      </div>
    </div>
  );
}

export default App;
