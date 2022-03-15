import { useState, useEffect } from "react";
import Category from "../components/Category";

function Categories() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetch("http://localhost:8089/api/ToDoList/GetCategories")
      .then((res) => res.json())
      .then((data) => {
        setIsLoaded(true);
        setCategories(data);
      });
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  else
    return (
      <>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Category category={category} />
            </li>
          ))}
        </ul>
      </>
    );
}

export default Categories;
