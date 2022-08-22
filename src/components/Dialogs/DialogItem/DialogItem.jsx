import React from "react";
import { Link } from "react-router-dom";
import s from "./../Dialogs.module.css";
const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;

  return (
    <div className={s.dialog + " " + s.active}>
      <Link to={path}>{props.name}</Link>
    </div>
  );
};

export default DialogItem;
