import * as classes from "./Header.module.css";

function Header() {
  return (
    <header className={classes.default.header}>
      <span className={classes.default.logo}>ToDo List</span>
      <ul className={classes.default.routes}>
        <li className={classes.default.first}>Задачи</li>
        <li>Категории</li>
      </ul>
      <a href="#">Добавить задачу</a>
    </header>
  );
}

export default Header;
