import * as classes from "./Task.module.css";

import Modal from "./Modal";

import { useState, useEffect } from "react";

function Task(props: TodoProps) {
  const [isCategorized, setIsCategorized] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    fetch("http://localhost:8089/api/ToDoList/GetCategories")
      .then((res) => res.json())
      .then((data: Category[]) => {
        setCategories(data);
        setIsCategorized(true);
      });
  }, []);

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8089/api/ToDoList/RemoveTask/${id}`).then(() =>
      setShow(false)
    );
  };

  if (!isCategorized) return <div></div>;
  else if (props.todo.categoryId) {
    let categoryName: string = "";
    for (let category of categories) {
      if (category.id === props.todo.categoryId) {
        categoryName = category.name;
      }
    }
    return (
      <div className={classes.default.control}>
        <div className={classes.default.taskInfo}>
          <h2>{props.todo.name}</h2>
          <h3>
            <i className="fa-solid fa-folder-open"></i>
            {categoryName}
          </h3>
          <p>{props.todo.description}</p>
        </div>
        <div className={classes.default.btn_control}>
          <button className={classes.default.btn}>
            <i className="fa-solid fa-pen"></i>
          </button>
          <button className={classes.default.btn} onClick={() => setShow(true)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
        <Modal onClose={() => setShow(false)} show={show}>
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
                setShow(false);
              }}
            >
              Закрыть
            </button>
          </div>
        </Modal>
      </div>
    );
  }
  return (
    <div className={classes.default.control}>
      <div className={classes.default.taskInfo}>
        <h2>{props.todo.name}</h2>
        <p>{props.todo.description}</p>
      </div>
      <div className={classes.default.btn_control}>
        <button className={classes.default.btn}>
          <i className="fa-solid fa-pen"></i>
        </button>
        <button className={classes.default.btn} onClick={() => setShow(true)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
      <Modal onClose={() => setShow(false)} show={show}>
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
              setShow(false);
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
