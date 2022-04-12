import { useState, useContext, useEffect } from "react";

import { PageContext } from "../App";

import Dropdown from "./Dropdown";

import * as classes from "./CreateTodoForm.module.css";

const UpdateTodoForm: React.FC<UpdateFormProps> = (props) => {
  const { id } = props;
  const {
    todos,
    setTodos,
    categories,
    selectList,
    setSelectList,
    isListOpen,
    setIsListOpen,
  } = useContext(PageContext);
  const todoToUpdate = todos.filter((todo) => todo.id === id)[0];
  const [nameInput, setNameInput] = useState(todoToUpdate.name);
  const [descInput, setDescInput] = useState(
    todoToUpdate.description ? todoToUpdate.description : ""
  );
  const [nameInputError, setNameInputError] = useState(false);
  const [descInputError, setDescInputError] = useState(false);
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

  const handleSubmitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameInput.length === 0 || nameInput.length > 255)
      setNameInputError(true);
    if (setDescInput.length > 1536) setDescInputError(true);

    if (
      !nameInputError &&
      nameInput.length !== 0 &&
      !descInputError &&
      descInput.length <= 10
    ) {
      const abortController = new AbortController();
      const todoData: TodoData = {
        id: id,
        name: nameInput,
        categoryId: catInput,
      };
      if (descInput) {
        todoData["description"] = descInput;
      }

      fetch("http://localhost:8089/api/ToDoList/UpdateTask", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Failed to update task");
        })
        .then((data: Todo) => {
          const newTodos: Todo[] = todos.filter((todo) => todo.id !== data.id);
          setTodos([...newTodos, data]);
          props.onClose();
        });
      return () => {
        abortController.abort();
      };
    }
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
              name="name"
              type="text"
              value={nameInput}
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
              isUpdate={true}
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
            value={descInput}
          />
          {descInputError && descInput.length > 1536 ? (
            <span className="name-input-error">
              Поле не может содержать больше 1536 знаков
            </span>
          ) : null}
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
};

export default UpdateTodoForm;
