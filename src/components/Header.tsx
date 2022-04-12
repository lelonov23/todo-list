import * as classes from "./Header.module.css";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";

import Modal from "./Modal";
import CreateTodoForm from "./CreateTodoForm";
import CreateCategoryForm from "./CreateCategoryForm";
import { PageContext } from "../App";

const Header: React.FC = () => {
  const [show, setShow] = useState(false);

  const { page } = useContext(PageContext);

  let isTasks = page === "tasks";
  let isCategories = page === "categories";

  let createTodoModal = (
    <Modal
      onClose={() => {
        setShow(false);
      }}
      show={show}
    >
      <CreateTodoForm
        onClose={() => {
          setShow(false);
        }}
      />
    </Modal>
  );

  let createCategoryModal = (
    <Modal
      onClose={() => {
        setShow(false);
      }}
      show={show}
    >
      <CreateCategoryForm
        onClose={() => {
          setShow(false);
        }}
      />
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
      {page ? addButton : null}
      {isTasks && createTodoModal}
      {isCategories && createCategoryModal}
    </header>
  );
};

export default Header;
