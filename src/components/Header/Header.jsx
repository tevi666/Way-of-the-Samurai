import React from "react";
import { Link } from "react-router-dom";
import s from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={s.header}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/d/db/Zeronet_logo.png" />
      <div className={s.loginBlock}>
        {
          props.isAuth ? props.login
            : <Link to={'/login'}>Login</Link>
        }
      </div>
    </header>
  );
};

export default Header;
