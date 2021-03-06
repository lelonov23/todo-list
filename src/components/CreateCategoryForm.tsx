import { useState, useContext } from "react";

import { PageContext } from "../App";

import * as classes from "./CreateCategoryForm.module.css";

interface CreateFormProps {
  onClose: () => void;
}

const CreateCategoryForm: React.FC<CreateFormProps> = (props) => {
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [nameInputError, setNameInputError] = useState(false);
  const [descInputError, setDescInputError] = useState(false);
  const { categories, setCategories } = useContext(PageContext);

  const handleSubmitCategory = (e: React.FormEvent<HTMLFormElement>) => {
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
      const catData: CatData = { name: nameInput };
      if (descInput) {
        catData["description"] = descInput;
      }

      fetch("http://localhost:8089/api/ToDoList/AddCategory", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(catData),
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Failed to create category");
        })
        .then((data: Category) => {
          setCategories([...categories, data]);
          setNameInput("");
          setDescInput("");
          props.onClose();
        });
    }
  };

  return (
    <>
      <h2>Создание категории</h2>
      <form
        className={classes.default.categoryForm}
        onSubmit={(e) => handleSubmitCategory(e)}
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
              onChange={(e) => {
                setNameInput(e.target.value);
                setNameInputError(
                  e.target.value.length === 0 || e.target.value.length > 255
                );
              }}
              placeholder="Введите имя категории"
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
            placeholder="Введите описание категории"
          />
          {descInputError && descInput.length > 1536 ? (
            <span className="name-input-error">
              Поле не может содержать больше 1536 знаков
            </span>
          ) : null}
        </div>
        <div className={classes.default.btnControl}>
          <button className={classes.default.btnAction}>Создать</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setNameInput("");
              setDescInput("");
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

export default CreateCategoryForm;
