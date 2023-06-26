import React, { useState } from 'react';

import Banner from './Banner/Banner';
import NavTab from './NavTab/NavTab';
import './Main.css';

function Main() {
  return (
    <section className="main">
      <Banner />
      <NavTab />
    </section>
  );
}

export default Main;
