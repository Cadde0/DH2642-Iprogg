import React, { useState } from "react";
import "../styles/header.css";
import SidebarView from "../views/sidebarView";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  function handleToMain() {
    window.location.hash = "/";
  }
  function handleToStandings() {
    window.location.hash = "#/standings";
  }
  function handleToTeamsView() {
    window.location.hash = "#/teams";
  }
  function handleToPlayersView() {
    window.location.hash = "#/players";
  }
  function handleToScheduleView() {
    window.location.hash = "#/schedule";
  }

  function handleToLogInView() {
    window.location.hash = "#/login";
  }

  return (
    <div
      className="header"
      style={{ backgroundImage: `url("https://i.ibb.co/zH0239X/header-bg.png")` }}
    >
      <div>
        <img
          className="sidebar-toggle"
          src="https://i.ibb.co/QK2WrTt/sidebar-button.png"
          alt="Open sidebar"
          onClick={toggleSidebar}
        />
      </div>
      <div className="logo-container">
        <img className="logo" src="https://i.ibb.co/XjxkQwL/logo.png" alt="NHL Logo" />
        <h1 className="website-name">NHL Insight</h1>
      </div>
      <SidebarView
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
        toMain={handleToMain}
        toStandings={handleToStandings}
        toTeamsView={handleToTeamsView}
        toPlayersView={handleToPlayersView}
        toScheduleView={handleToScheduleView}
        toLogInView={handleToLogInView}
      />
    </div>
  );
};

export default Header;
