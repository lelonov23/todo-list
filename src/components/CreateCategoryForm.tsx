import { useState, useContext } from "react";

import { PageContext } from "../App";

import * as classes from "./CreateCategoryForm.module.css";

function CreateCategoryForm(props: CreateFormProps) {
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [nameInputError, setNameInputError] = useState(false);
  const { categories, setCategories } = useContext(PageContext);

  const handleSubmitCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameInput.length === 0) setNameInputError(true);
    if (!nameInputError && nameInput.length !== 0) {
      const catData: CatData = { name: nameInput };
      if (descInput) {
        catData["description"] = descInput;
      }

      const res = await fetch(
        "http://localhost:8089/api/ToDoList/AddCategory",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(catData),
        }
      );
      await res.json().then((data: Category) => {
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
                setNameInputError(e.target.value.length === 0);
              }}
              placeholder="Введите имя категории"
            />
            {nameInputError ? (
              <span className="name-input-error">
                Поле должно быть обязательным
              </span>
            ) : null}
          </div>
        </div>
        <div className={classes.default.textOnInput}>
          <label htmlFor="desc">Описание</label>
          <textarea
            className={classes.default.formControl}
            id="desc"
            name="description"
            onChange={(e) => setDescInput(e.target.value)}
            placeholder="Введите описание категории"
            required
          />
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
}

export default CreateCategoryForm;
