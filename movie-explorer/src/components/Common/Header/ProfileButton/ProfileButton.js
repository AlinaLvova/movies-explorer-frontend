import "./ProfileButton.css";
import React from "react";
import { Link } from "react-router-dom";
import "../../constant/common.css";

function ProfileButton() {
  return (
    <div className="profile-btn button-style">
      <Link to="/profile" className="profile-btn__link link">
        Аккаунт
      </Link>
    </div>
  );
}

export default ProfileButton;
