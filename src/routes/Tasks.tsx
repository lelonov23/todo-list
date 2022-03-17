import * as classes from "./Tasks.module.css";

import { useState, useEffect } from "react";
import Task from "../components/Task";

function Tasks(props: PageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    let abortController = new AbortController();
    props.pageSetter("tasks");
    fetch("http://localhost:8089/api/ToDoList/GetTasks")
      .then((res) => res.json())
      .then((data) => {
        setIsLoaded(true);
        setTodos(data);
      });
    return () => {
      abortController.abort();
    };
  });

  if (!isLoaded) return <div></div>;
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
