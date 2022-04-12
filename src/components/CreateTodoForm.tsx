import { useState, useEffect, useContext } from "react";

import * as classes from "./CreateTodoForm.module.css";

import { PageContext } from "../App";

import Dropdown from "./Dropdown";

interface CreateFormProps {
  onClose: () => void;
}

const CreateTodoForm: React.FC<CreateFormProps> = (props) => {
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [nameInputError, setNameInputError] = useState(false);
  const [descInputError, setDescInputError] = useState(false);
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

  const handleSubmitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameInput.length === 0 || nameInput.length > 255)
      setNameInputError(true);
    if (descInput.length > 1536) setDescInputError(true);

    if (
      !nameInputError &&
      nameInput.length !== 0 &&
      !descInputError &&
      descInput.length <= 1536
    ) {
      const abortController = new AbortController();
      const todoData: TodoData = { name: nameInput, categoryId: 0 };
      if (descInput) {
        todoData["description"] = descInput;
      }

      if (catInput) {
        todoData["categoryId"] = catInput;
      }

      console.log(todoData);

      fetch("http://localhost:8089/api/ToDoList/AddTask", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Failed to create task");
        })
        .then((data) => {
          setTodos([...todos, data]);
          setNameInput("");
          setDescInput("");
          setCatInput(0);
          resetThenSet(0);
          props.onClose();
        });
      return () => {
        abortController.abort();
      };
    }
  };

  return (
    <div onClick={() => setIsListOpen(false)}>
      <h2>Создание задачи</h2>
      <form
        className={classes.default.todoForm}
        onSubmit={(e) => handleSubmitTodo(e)}
      >
        <div className={classes.default.inputsControl}>
          <div
            className={
              nameInputError
                ? `${classes.default.textOnInput} ${classes.default.textOnInputError}`
                : classes.default.textOnInput
            }
          >
            <label htmlFor="name">
              Имя<span className="required">*</span>
            </label>
            <input
              className={
                nameInputError
                  ? `${classes.default.formControlError} ${classes.default.formControl}`
                  : classes.default.formControl
              }
              id="name"
              name="todo-name"
              type="text"
              onChange={(e) => {
                setNameInput(e.target.value);
                setNameInputError(
                  e.target.value.length === 0 || e.target.value.length > 255
                );
              }}
              placeholder="Введите имя задачи"
            />
            {nameInputError && nameInput.length === 0 ? (
              <span className="name-input-error">
                Поле должно быть обязательным
              </span>
            ) : null}
            {nameInputError && nameInput.length > 255 ? (
              <span className="name-input-error">
                Поле не может содержать больше 255 знаков
              </span>
            ) : null}
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
              isUpdate={false}
            />
          </div>
        </div>
        <div
          className={
            descInputError
              ? `${classes.default.textOnInput} ${classes.default.textOnInputError}`
              : classes.default.textOnInput
          }
        >
          <label htmlFor="desc">Описание</label>
          <textarea
            className={
              descInputError
                ? `${classes.default.formControlError} ${classes.default.formControl}`
                : classes.default.formControl
            }
            id="desc"
            name="description"
            onChange={(e) => {
              setDescInput(e.target.value);
              setDescInputError(e.target.value.length > 1536);
            }}
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
};

export default CreateTodoForm;
