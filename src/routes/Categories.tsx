import * as classes from "./Categories.module.css";

import { useState, useEffect, useContext } from "react";
import Category from "../components/Category";
import { PageContext } from "../App";

function Categories() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { setPage } = useContext(PageContext);

  useEffect(() => {
    let abortController = new AbortController();
    setPage("categories");
    fetch("http://localhost:8089/api/ToDoList/GetCategories")
      .then((res) => res.json())
      .then((data) => {
        setIsLoaded(true);
        setCategories(data);
      });
    return () => {
      abortController.abort();
    };
  });

  if (!isLoaded) return <div></div>;
  else
    return (
      <div className={classes.default.categoryList}>
        <ul>
          {categories.map((category) => (
            <li className={classes.default.category} key={category.id}>
              <Category category={category} />
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Categories;
