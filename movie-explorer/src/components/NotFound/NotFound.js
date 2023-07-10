import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css';

function NotFound() {
  return (
    <section className="not-found">
      <h1 className="not-found__header">404</h1>
      <h4 className="not-found__subtitle">Страница не найдена</h4>
      <Link to="." className="not-found__back-link link">Назад</Link>
    </section>
  );
}

export default NotFound;
