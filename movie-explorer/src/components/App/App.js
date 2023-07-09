import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MovieProvider } from "../../contexts/MovieContext";
import { VisibleRowsProvider } from "../../contexts/VisibleRowsContext";
import Header from "../Common/Header/Header";
import Menu from "../Common/Header/Menu/Menu";
import Footer from "../Common/Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import movieList from "../../utils/movieList";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(movieList);
  }, []);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleLogin = () => {
    //setIsMenuOpen(true);
  };

  const closeAllPopups = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="page">
      <div className="page__container">
        <MovieProvider>
          <VisibleRowsProvider>
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
                  element={<Login onLogin={handleLogin} />}
                ></Route>
                <Route
                  exact
                  path="/signup"
                  element={<Register onRegister={handleLogin} />}
                ></Route>
                <Route
                  exact
                  path="/profile"
                  // element={}
                ></Route>
                <Route
                  exact
                  path="/movies"
                  element={<Movies cards={cards} />}
                ></Route>
                <Route path="/saved-movies" element={<SavedMovies />}></Route>
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
          </VisibleRowsProvider>
        </MovieProvider>
      </div>
    </div>
  );
}

export default App;
