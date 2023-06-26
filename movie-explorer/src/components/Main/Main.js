import React, { useState } from 'react';

import Banner from './Banner/Banner';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import './Main.css';

function Main() {
  return (
    <section className="main">
      <Banner />
      <NavTab />
      <AboutProject />
    </section>
  );
}

export default Main;
