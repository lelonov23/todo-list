import { useState, useContext, useEffect } from "react";

import { PageContext } from "../App";

import Dropdown from "./Dropdown";

import * as classes from "./CreateTodoForm.module.css";

function UpdateTodoForm(props: UpdateFormProps) {
  const { id } = props;
  const {
    todos,
    setTodos,
    selectList,
    setSelectList,
    isListOpen,
    setIsListOpen,
  } = useContext(PageContext);
  const todoToUpdate = todos.filter((todo) => todo.id === id)[0];
  const [nameInput, setNameInput] = useState(todoToUpdate.name);
  const [descInput, setDescInput] = useState(todoToUpdate.description);
  const [catInput, setCatInput] = useState(todoToUpdate.categoryId);

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
    const todoData: TodoData = {
      id: id,
      name: nameInput,
      categoryId: catInput,
    };
    if (descInput) {
      todoData["description"] = descInput;
    }

    const res = await fetch("http://localhost:8089/api/ToDoList/UpdateTask", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });
    await res.json().then((data: Todo) => {
      const newTodos: Todo[] = todos.filter((todo) => todo.id !== data.id);
      setTodos([...newTodos, data]);
      props.onClose();
    });
  };

  useEffect(() => {
    if (todoToUpdate.categoryId) resetThenSet(todoToUpdate.categoryId);
  }, []);

  return (
    <>
      <h2>Редактирование задачи</h2>
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
              name="name"
              type="text"
              value={nameInput}
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
            value={descInput}
          />
        </div>

        <div className={classes.default.btnControl}>
          <button className={classes.default.btnAction}>Редактировать</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              props.onClose();
            }}
          >
            Закрыть
          </button>
        </div>
      </form>
    </>
  );
}

export default UpdateTodoForm;
