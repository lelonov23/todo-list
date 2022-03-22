import * as classes from "./Task.module.css";

import Modal from "./Modal";

import { PageContext } from "../App";

import { useState, useContext } from "react";

function Task(props: TodoProps) {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const { categories, todos, setTodos } = useContext(PageContext);

  const handleDelete = (id: number) => {
    const abortController = new AbortController();
    fetch(`http://localhost:8089/api/ToDoList/RemoveTask/${id}`)
      .then((res) => {
        setShowDelete(false);
      })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      });
    return () => {
      abortController.abort();
    };
  };

  let categoryName: string = "";
  if (props.todo.categoryId) {
    for (let category of categories) {
      if (category.id === props.todo.categoryId) {
        categoryName = category.name;
      }
    }
  }

  if (!categories) return <div></div>;
  return (
    <div className={classes.default.control}>
      <div className={classes.default.taskInfo}>
        <h2>{props.todo.name}</h2>
        {props.todo.categoryId ? (
          <h3>
            <i className="fa-solid fa-folder-open"></i>
            {categoryName}
          </h3>
        ) : null}
        <p>{props.todo.description}</p>
      </div>
      <div className={classes.default.btn_control}>
        <button
          className={classes.default.btn}
          onClick={() => setShowEdit(true)}
        >
          <i className="fa-solid fa-pen"></i>
        </button>
        <button
          className={classes.default.btn}
          onClick={() => setShowDelete(true)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
      <Modal onClose={() => setShowDelete(false)} show={showDelete}>
        <div>Уверены?</div>
        <div className={classes.default.btnControl}>
          <button
            className={classes.default.btnAction}
            onClick={() => handleDelete(props.todo.id)}
          >
            Удалить
          </button>
          <button
            onClick={() => {
              setShowDelete(false);
            }}
          >
            Закрыть
          </button>
        </div>
      </Modal>
      <Modal onClose={() => setShowEdit(false)} show={showEdit}>
        <></>
      </Modal>
    </div>
  );
}

export default Task;
