import React from "react";

import Banner from "./Banner/Banner";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import "./Main.css";

function Main(props) {
  return (
    <div className="page__container">
      <Header isLoggedIn={props.isLoggedIn} onClickMenuButton={props.onMenuButtonClick}/>
      <main className="content">
        {/* <section className="main"> */}
          <Banner />
          <NavTab />
          <AboutProject />
          <Techs />
          <AboutMe />
        {/* </section> */}
      </main>
      <Footer />
    </div>
  );
}

export default Main;
