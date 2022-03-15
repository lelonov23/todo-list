import { useState, useEffect } from "react";
import Task from "../components/Task";

function Tasks() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    fetch("http://localhost:8089/api/ToDoList/GetTasks")
      .then((res) => res.json())
      .then((data) => {
        setIsLoaded(true);
        setTodos(data);
      });
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  else
    return (
      <>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <Task todo={todo} />
            </li>
          ))}
        </ul>
      </>
    );
}

export default Tasks;
