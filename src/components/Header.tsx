import * as classes from "./Header.module.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Modal from "./Modal";

function Header(props: HeaderProps) {
  const [show, setShow] = useState(false);

  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");

  let isTasks = props.page === "tasks";
  let isCategories = props.page === "categories";

  const handleSubmitTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todoData: TodoData = { name: nameInput };
    if (descInput) {
      todoData["description"] = descInput;
    }

    if (true) {
      todoData["categoryId"] = 1;
    }

    const res = await fetch("http://localhost:8089/api/ToDoList/AddTask", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });
    await res.json().then(() => {
      setShow(false);
      setNameInput("");
      setDescInput("");
    });
  };

  let createTodoModal = (
    <Modal onClose={() => setShow(false)} show={show}>
      <form method="post" action="#" onSubmit={(e) => handleSubmitTodo(e)}>
        <input
          id="name"
          name="name"
          type="text"
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Введите имя задачи"
          required
        />
        <input
          id="description"
          name="description"
          type="text"
          onChange={(e) => setDescInput(e.target.value)}
          placeholder="Введите описание задачи"
        />
        <button>Создать</button>
        <button onClick={() => setShow(false)}>Закрыть</button>
      </form>
    </Modal>
  );

  let createCategoryModal = (
    <Modal onClose={() => setShow(false)} show={show}>
      <form method="post" action="#">
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Введите имя категории"
          required
        />
        <button>Создать</button>
        <button onClick={() => setShow(false)}>Закрыть</button>
      </form>
    </Modal>
  );

  let taskClasses = isTasks
    ? `${classes.default.routerLink} ${classes.default.active}`
    : `${classes.default.routerLink}`;

  let catClasses = isCategories
    ? `${classes.default.routerLink} ${classes.default.active}`
    : `${classes.default.routerLink}`;

  let addButton = isTasks ? (
    <button className={classes.default.link} onClick={() => setShow(true)}>
      Добавить задачу
    </button>
  ) : (
    <button className={classes.default.link} onClick={() => setShow(true)}>
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
      {isTasks && createTodoModal}
      {isCategories && createCategoryModal}
    </header>
  );
}

export default Header;
