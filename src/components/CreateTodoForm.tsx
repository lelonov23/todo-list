import { useState } from "react";

import * as classes from "./CreateTodoForm.module.css";

function CreateTodoForm(props: CreateFormProps) {
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");

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
      props.onClose();
    });
  };

  return (
    <>
      <h2>Создание задачи</h2>
      <form
        className={classes.default.todoForm}
        onSubmit={(e) => handleSubmitTodo(e)}
      >
        <div className={classes.default.inputsControl}>
          <div className={classes.default.textOnInput}>
            <label htmlFor="name">Имя</label>
            <input
              className={classes.default.formControl}
              id="name"
              name="todo-name"
              type="text"
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Введите имя задачи"
              required
            />
          </div>
          <div className={classes.default.textOnInput}>
            <label htmlFor="desc">Описание</label>
            <input
              className={classes.default.formControl}
              id="desc"
              name="description"
              type="text"
              onChange={(e) => setDescInput(e.target.value)}
              placeholder="Введите описание задачи"
              required
            />
          </div>
        </div>

        <div className={classes.default.btnControl}>
          <button className={classes.default.btnAction}>Создать</button>
          <button onClick={props.onClose}>Закрыть</button>
        </div>
      </form>
    </>
  );
}

export default CreateTodoForm;
