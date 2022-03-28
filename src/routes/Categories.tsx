import * as classes from "./Categories.module.css";

import { useEffect, useContext } from "react";
import Category from "../components/Category";
import { PageContext } from "../App";

function Categories() {
  const { setPage, categories, setCategories } = useContext(PageContext);

  useEffect(() => {
    setPage("categories");
  });

  if (!categories || categories.length === 0)
    return (
      <div className={classes.default.no_cats}>
        <p>Пока категорий нет, создайте новую</p>
      </div>
    );
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
