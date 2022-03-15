import * as classes from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={classes.default.header}>
      <span className={classes.default.logo}>ToDo List</span>
      <ul className={classes.default.routes}>
        <li className={classes.default.first}>
          <Link to={"/tasks"}>Задачи</Link>
        </li>
        <li>
          <Link to={"/categories"}>Категории</Link>
        </li>
      </ul>
      <a href="#">Добавить задачу</a>
    </header>
  );
}

export default Header;
