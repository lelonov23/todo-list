import * as classes from "./Tasks.module.css";

import { useEffect, useContext } from "react";
import Task from "../components/Task";

import { PageContext } from "../App";

function Tasks() {
  const { setPage, todos, categories } = useContext(PageContext);
  useEffect(() => {
    setPage("tasks");
  });

  if (!todos || !todos.length)
    return (
      <div className={classes.default.no_tasks}>
        <p>Пока задач нет, создайте новую</p>
      </div>
    );
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
