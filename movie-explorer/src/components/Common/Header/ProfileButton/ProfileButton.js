import "./ProfileButton.css";
import React, {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import "../../constant/common.css";

function ProfileButton() {
  const location = useLocation();

  const [isBlueIcon, setIsBlueIcon] = useState(location.pathname === "/");
  useEffect(() => {
    setIsBlueIcon(location.pathname === "/");
  }, [location.pathname]);

  return (
    <div className="profile-btn button-style">
      <Link
        to="/profile"
        className={`profile-btn__link link ${
          isBlueIcon ? "profile-btn__link_background" : ""
        }`}
      >
        Аккаунт
      </Link>
    </div>
  );
}

export default ProfileButton;
