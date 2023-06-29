import React, { useState } from "react";

import "./Techs.css";
import SectionHeader from "../../Common/SectionHeader/SectionHeader";

function Techs() {
  return (
    <section className="techs">
      <SectionHeader headerTitle={"Технологии"} />
      <div className="techs__title">7 технологий</div>
      <div className="techs__subtitle">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </div>
      <div className="techs__elements-wrapper">
        <div className="techs__element">HTML</div>
        <div className="techs__element">CSS</div>
        <div className="techs__element">JS</div>
        <div className="techs__element">React</div>
        <div className="techs__element">Git</div>
        <div className="techs__element">Express.js</div>
        <div className="techs__element">mongoDB</div>
      </div>
    </section>
  );
}

export default Techs;
