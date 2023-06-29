import React, { useState } from "react";

import "./NavTab.css";

function NavTab() {
  return (
    <nav className="navtab">
      <ul className="nav__list">
        <li>
          <a href="#AboutProject" className="nav__element link">
            О проекте
          </a>
        </li>
        <li>
          <a href="#Techs" className="nav__element link">
            Технологии
          </a>
        </li>
        <li>
          <a href="#AboutMe" className="nav__element link">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
