import React, { useState } from "react";

import "./Techs.css";
import SectionHeader from "../../Common/SectionHeader/SectionHeader";

function Techs() {
  return (
    <section id="Techs" className="techs">
      <SectionHeader headerTitle={"Технологии"} />
      <h2 className="techs__title">7 технологий</h2>
      <p className="techs__subtitle">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__elements-wrapper">
        <li>
          <h4 className="techs__element">CSS</h4>
        </li>
        <li>
          <h4 className="techs__element">JS</h4>
        </li>
        <li>
          <h4 className="techs__element">React</h4>
        </li>
        <li>
          <h4 className="techs__element">Git</h4>
        </li>
        <li>
          <h4 className="techs__element">HTML</h4>
        </li>
        <li>
          <h4 className="techs__element">Express.js</h4>
        </li>
        <li>
          <h4 className="techs__element">mongoDB</h4>
        </li>
      </ul>
    </section>
  );
}

export default Techs;
