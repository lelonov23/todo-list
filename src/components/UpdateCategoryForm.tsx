import { useState, useContext } from "react";

import { PageContext } from "../App";

import * as classes from "./CreateTodoForm.module.css";

function UpdateCategoryForm(props: UpdateFormProps) {
  const { categories, setCategories } = useContext(PageContext);
  const { id } = props;
  const catToUpdate = categories.filter((category) => category.id === id)[0];
  const [nameInput, setNameInput] = useState(catToUpdate.name);
  const [descInput, setDescInput] = useState(catToUpdate.description);

  const handleSubmitCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const catData: CatData = { id: id, name: nameInput };
    if (descInput) {
      catData["description"] = descInput;
    }

    const res = await fetch(
      "http://localhost:8089/api/ToDoList/UpdateCategory",
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
      const newCats: Category[] = categories.filter(
        (category) => category.id !== data.id
      );
      setCategories([...newCats, data]);
      props.onClose();
    });
  };

  return (
    <>
      <h2>Редактирование категории</h2>
      <form
        className={classes.default.categoryForm}
        onSubmit={(e) => handleSubmitCategory(e)}
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
              placeholder="Введите имя категории"
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
              placeholder="Введите описание категории"
              value={descInput}
            />
          </div>
        </div>
        <div className={classes.default.btnControl}>
          <button className={classes.default.btnAction}>Создать</button>
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

export default UpdateCategoryForm;
