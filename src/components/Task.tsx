import { useState, useEffect } from "react";

function Task(props: TodoProps) {
  const [isCategorized, setIsCategorized] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetch("http://localhost:8089/api/ToDoList/GetCategories")
      .then((res) => res.json())
      .then((data: Category[]) => {
        setCategories(data);
        setIsCategorized(true);
      });
  }, []);

  if (!isCategorized) return <div>Loading...</div>;
  else if (props.todo.categoryId) {
    let categoryName: string = "";
    for (let category of categories) {
      if (category.id === props.todo.categoryId) {
        categoryName = category.name;
      }
    }
    return (
      <>
        <h2>{props.todo.name}</h2>
        <h3>{categoryName}</h3>
        <p>{props.todo.description}</p>
      </>
    );
  }
  return (
    <>
      <h2>{props.todo.name}</h2>
      <p>{props.todo.description}</p>
    </>
  );
}

export default Task;
