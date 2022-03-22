import * as classes from "./Tasks.module.css";

import { useState, useEffect, useContext } from "react";
import Task from "../components/Task";

import { PageContext } from "../App";

function Tasks() {
  const { setPage, todos } = useContext(PageContext);
  useEffect(() => {
    let abortController = new AbortController();
    setPage("tasks");
    return () => {
      abortController.abort();
    };
  });

  if (!todos) return <div></div>;
  else
    return (
      <div className={classes.default.taskList}>
        <ul>
          {todos.map((todo) => (
            <li className={classes.default.task} key={todo.id}>
              <Task todo={todo} />
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Tasks;
