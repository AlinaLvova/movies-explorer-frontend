import './HeaderCommon.css';
import '../../constant/common.css';
import { NavLink } from 'react-router-dom';
import { useState, React } from "react";
import ProfileButton from '../ProfileButton/ProfileButton';

function HeaderCommon() {
  return (
    <nav className="header__buttons-container">
      <div className="header__nav-links-container">
        <NavLink 
          to="/movies" 
          className={({ isActive }) =>`header__nav-links button-style link ${isActive && 'header__nav-links_weight'}`}>
            Фильмы
        </NavLink>
        <NavLink 
          to="/saved-movies" 
          className={({ isActive }) =>`header__nav-links button-style link ${isActive && 'header__nav-links_weight'}`}>
            Сохранённые фильмы
        </NavLink>
      </div>
      <ProfileButton/>
    </nav>
  );
}

export default HeaderCommon;
