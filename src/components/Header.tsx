import * as classes from "./Header.module.css";
import { Link } from "react-router-dom";

function Header(props: HeaderProps) {
  let isTasks = props.page === "tasks";
  let isCategories = props.page === "categories";

  let taskClasses = isTasks
    ? `${classes.default.routerLink}` + " " + `${classes.default.active}`
    : `${classes.default.routerLink}`;

  let catClasses = isCategories
    ? `${classes.default.routerLink}` + " " + `${classes.default.active}`
    : `${classes.default.routerLink}`;

  console.log(isTasks);

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

      <a className={classes.default.link} href="#">
        Добавить задачу
      </a>
    </header>
  );
}

export default Header;
