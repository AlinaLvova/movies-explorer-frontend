import './App.css';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRef } from 'react'
import Header from '../Common/Header/Header';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  return (
    <div className="page">
      <div className="page__container">
        <Header></Header>
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
      </div>
    </div>
  );
}

export default App;

