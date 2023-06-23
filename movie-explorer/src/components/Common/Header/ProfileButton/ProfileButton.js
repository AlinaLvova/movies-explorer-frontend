import "./ProfileButton.css";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../../constant/common.css';

function ProfileButton() {
  return (
    <div className="profile__container button-style">
      <Link to="/profile" className="profile__link link">
        Аккаунт
      </Link>
    </div>
  );
}

export default ProfileButton;
