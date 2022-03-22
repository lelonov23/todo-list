import * as classes from "./Categories.module.css";

import { useState, useEffect, useContext } from "react";
import Category from "../components/Category";
import { PageContext } from "../App";

function Categories() {
  const { setPage, categories, setCategories } = useContext(PageContext);

  useEffect(() => {
    let abortController = new AbortController();
    setPage("categories");
    return () => {
      abortController.abort();
    };
  });

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
