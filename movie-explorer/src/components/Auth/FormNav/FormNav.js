import React from 'react';
import { Link } from "react-router-dom";

import './FormNav.css';

function FormNav({questionTitle, linkTitle, linkTo}) {
  return (
    <div className="form-nav">
        <span className="form-nav__question">{questionTitle}</span>
        <Link to={linkTo} className="form-nav__link link">{linkTitle}</Link>
    </div>
  );
}

export default FormNav;
