import './App.css';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRef } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="page">
      <div className="page__container">
        <header className="page__header"></header>
        <main className="page__main">
          <Routes>
            <Route
              path="*"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/signin" replace />
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
          </Routes>
        </main>
        <footer className="page__footer"></footer>
      </div>
    </div>
  );
}

export default App;

