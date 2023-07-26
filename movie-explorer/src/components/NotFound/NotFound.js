import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Перенаправляем на предыдущую страницу
  };
  return (
    <div className="page__container">
      <main className="content content_not-found">
        <section className="not-found">
          <h1 className="not-found__header">404</h1>
          <p className="not-found__subtitle">Страница не найдена</p>
          <Link to="#" className="not-found__back-link link" onClick={handleGoBack}>
            Назад
          </Link>
        </section>
      </main>
    </div>
  );
}

export default NotFound;
