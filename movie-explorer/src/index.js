import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App.js";
import { BrowserRouter } from "react-router-dom";

import { MovieProvider } from "./contexts/MovieContext";
import { PreloaderProvider } from "./contexts/PreloaderContext";
import { SearchProvider } from "./contexts/SearchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MovieProvider>
      <SearchProvider>
        <PreloaderProvider>
          <App />
        </PreloaderProvider>
      </SearchProvider>
      </MovieProvider>
    </BrowserRouter>
  </React.StrictMode>
);
