import React, { useState } from "react";

import "./NavTab.css";

function NavTab() {
  return (
    <nav className="navtab">
      <ul className="nav__list">
        <li> <a href="#part1" className="nav__element link">О проекте</a></li>
        <li> <a href="#part1" className="nav__element link">Технологии</a></li>
        <li> <a href="#part1" className="nav__element link">Студент</a></li>
      </ul>
    </nav>
  );
}

export default NavTab;
