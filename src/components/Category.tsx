import * as classes from "./Task.module.css";
import Modal from "./Modal";
import UpdateCategoryForm from "./UpdateCategoryForm";
import { PageContext } from "../App";

import { useState, useContext } from "react";

function Category(props: CategoryProps) {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { todos, setCategories, categories, setTodos } =
    useContext(PageContext);

  const handleDelete = (id: number) => {
    const abortController = new AbortController();
    const todosToUpdate = todos.filter((todo) => todo.categoryId === id);
    todosToUpdate.forEach((todo) => {
      let todoData = {
        id: todo.id,
        name: todo.name,
        description: todo.description,
        categoryId: 0,
      };
      fetch("http://localhost:8089/api/ToDoList/UpdateTask", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      })
        .then((res) => res.json())
        .then((data: Todo) => {
          const newTodos = todos.map((todo) => {
            if (todo.id === data.id) {
              let newTodo: Todo = {
                id: data.id,
                name: data.name,
                description: data.description,
              };
              return newTodo;
            } else return todo;
          });
          setTodos(newTodos);
        });
    });
    fetch(`http://localhost:8089/api/ToDoList/RemoveCategory/${id}`).then(
      () => {
        setCategories(categories.filter((cat) => cat.id !== id));
        setShowDelete(false);
      }
    );
    return () => abortController.abort();
  };

  return (
    <div className={classes.default.control}>
      <div className={classes.default.taskInfo}>
        <h2>{props.category.name}</h2>
        <p>{props.category.description}</p>
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
      <Modal onClose={() => setShowEdit(false)} show={showEdit}>
        <UpdateCategoryForm
          id={props.category.id}
          onClose={() => setShowEdit(false)}
        />
      </Modal>
      <Modal
        onClose={() => {
          setShowDelete(false);
        }}
        show={showDelete}
      >
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
              setShowDelete(false);
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
