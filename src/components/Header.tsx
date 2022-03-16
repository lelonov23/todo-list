import * as classes from "./Header.module.css";
import { Link } from "react-router-dom";

import Modal from "./Modal";

function Header(props: HeaderProps) {
  let isTasks = props.page === "tasks";
  let isCategories = props.page === "categories";

  let taskClasses = isTasks
    ? `${classes.default.routerLink} ${classes.default.active}`
    : `${classes.default.routerLink}`;

  let catClasses = isCategories
    ? `${classes.default.routerLink} ${classes.default.active}`
    : `${classes.default.routerLink}`;

  let addButton = isTasks ? (
    <button className={classes.default.link} onClick={() => console.log("hi")}>
      Добавить задачу
    </button>
  ) : (
    <button className={classes.default.link} onClick={() => console.log("hi")}>
      Добавить категорию
    </button>
  );

  return (
    <header className={classes.default.header}>
      <div className={classes.default.control}>
        <span className={classes.default.logo}>ToDo List</span>
        <ul className={classes.default.routes}>
          <li className={classes.default.first}>
            <Link className={taskClasses} to={"/tasks"}>
              Задачи
            </Link>
          </li>
          <li>
            <Link className={catClasses} to={"/categories"}>
              Категории
            </Link>
          </li>
        </ul>
      </div>
      {props.page ? addButton : null}
      <Modal />
    </header>
  );
}

export default Header;
