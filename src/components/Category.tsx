import * as classes from "./Task.module.css";
import Modal from "./Modal";

import { useState, useEffect } from "react";

function Category(props: CategoryProps) {
  const [show, setShow] = useState(false);

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8089/api/ToDoList/RemoveCategory/${id}`).then(() =>
      setShow(false)
    );
  };

  return (
    <div className={classes.default.control}>
      <div className={classes.default.taskInfo}>
        <h2>{props.category.name}</h2>
        <p>{props.category.description}</p>
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
            onClick={() => handleDelete(props.category.id)}
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

export default Category;
