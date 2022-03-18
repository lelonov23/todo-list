import { useState, useEffect } from "react";

import * as classes from "./CreateTodoForm.module.css";

function CreateTodoForm(props: CreateFormProps) {
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [catInput, setCatInput] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let abortController = new AbortController();
    fetch("http://localhost:8089/api/ToDoList/GetCategories")
      .then((res) => res.json())
      .then((data: Category[]) => {
        setCategories(data);
      });
    return () => {
      abortController.abort();
    };
  }, []);

  const handleSubmitTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todoData: TodoData = { name: nameInput };
    if (descInput) {
      todoData["description"] = descInput;
    }

    if (catInput) {
      todoData["categoryId"] = catInput;
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
      setNameInput("");
      setDescInput("");
      setCatInput(null);
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
          <div className={classes.default.select}>
            <label htmlFor="cat">Категория</label>
            <select
              name="category"
              id="cat"
              onChange={(e) => setCatInput(+e.target.value)}
            >
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
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
          <button
            onClick={(e) => {
              e.preventDefault();
              props.onClose();
              setNameInput("");
              setDescInput("");
              setCatInput(null);
            }}
          >
            Закрыть
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateTodoForm;
