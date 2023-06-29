import React, { useState } from 'react';

import Banner from './Banner/Banner';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import './Main.css';

function Main() {
  return (
    <section className="main">
      <Banner />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
    </section>
  );
}

export default Main;
