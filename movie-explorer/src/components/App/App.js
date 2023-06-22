import './App.css';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRef } from 'react'
import Header from '../Common/Header/Header';
import Menu from '../Common/Header/Menu/Menu';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const closeAllPopups = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="page">
      <div className="page__container">
        <Header onClickMenuButton={handleOpenMenu}></Header>
        <main className="page__main">
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
              // element={}
            ></Route>
            <Route
              path="/saved-movies"
              // element={
              //    <ProtectedRouteElement />
              // }
            ></Route>
            <Route
              path="/404"
              // element={
              //    <ProtectedRouteElement />
              // }
            ></Route>
          </Routes>
        </main>
        <footer className="page__footer"></footer>
        <Menu 
          isOpen={isMenuOpen}
          onClose={closeAllPopups}
        />
      </div>
    </div>
  );
}

export default App;

