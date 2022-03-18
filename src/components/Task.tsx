import * as classes from "./Task.module.css";

import Modal from "./Modal";

import { useState, useEffect } from "react";

function Task(props: TodoProps) {
  const [isCategorized, setIsCategorized] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => {
    let abortController = new AbortController();
    fetch("http://localhost:8089/api/ToDoList/GetCategories")
      .then((res) => res.json())
      .then((data: Category[]) => {
        setCategories(data);
        setIsCategorized(true);
      });
    return () => {
      abortController.abort();
    };
  }, []);

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8089/api/ToDoList/RemoveTask/${id}`).then(() =>
      setShowDelete(false)
    );
  };

  let categoryName: string = "";
  if (props.todo.categoryId) {
    for (let category of categories) {
      if (category.id === props.todo.categoryId) {
        categoryName = category.name;
      }
    }
  }

  if (!isCategorized) return <div></div>;
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
        <div>Уверены?</div>
        <div className={classes.default.btnControl}>
          <button
            className={classes.default.btnAction}
            // onClick={() => handleDelete(props.todo.id)}
          >
            Удалить
          </button>
          <button
            onClick={() => {
              setShowEdit(false);
            }}
          >
            Закрыть
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Task;
