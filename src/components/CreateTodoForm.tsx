import { useState, useEffect, useContext } from "react";

import * as classes from "./CreateTodoForm.module.css";

import { PageContext } from "../App";

import Dropdown from "./Dropdown";

function CreateTodoForm(props: CreateFormProps) {
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [catInput, setCatInput] = useState<number>(0);
  const {
    todos,
    setTodos,
    selectList,
    setSelectList,
    isListOpen,
    setIsListOpen,
  } = useContext(PageContext);

  const onSelect = (id: number) => {
    setCatInput(id);
  };

  const resetThenSet = (id: number) => {
    const temp = [...selectList];
    const newSelectData: CategorySelect[] = temp.map((cat) => {
      if (cat.id === id) {
        cat.selected = true;
      } else cat.selected = false;
      return cat;
    });
    setSelectList(newSelectData);
  };

  const handleSubmitTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todoData: TodoData = { name: nameInput, categoryId: 0 };
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
    await res.json().then((data) => {
      setTodos([...todos, data]);
      setNameInput("");
      setDescInput("");
      setCatInput(0);
      props.onClose();
    });
  };

  return (
    <div onClick={() => setIsListOpen(false)}>
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

          <div
            className={classes.default.textOnInput}
            onClick={(e) => e.stopPropagation()}
          >
            <label className={classes.default.dropdownLabel}>Категория</label>
            <Dropdown
              title="Выберите категорию"
              list={selectList}
              resetThenSet={resetThenSet}
              onSelect={onSelect}
              isListOpen={[isListOpen, setIsListOpen]}
            />
          </div>
        </div>
        <div className={classes.default.textOnInput}>
          <label htmlFor="desc">Описание</label>
          <textarea
            className={classes.default.formControl}
            id="desc"
            name="description"
            onChange={(e) => setDescInput(e.target.value)}
            placeholder="Введите описание задачи"
          />
        </div>

        <div className={classes.default.btnControl}>
          <button className={classes.default.btnAction}>Создать</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setNameInput("");
              setDescInput("");
              setCatInput(0);
              props.onClose();
            }}
          >
            Закрыть
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTodoForm;
