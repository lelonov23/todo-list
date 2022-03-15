function Task(props: AppProps) {
  return (
    <>
      <h2>{props.todo.name}</h2>
      {props.todo.categoryId ? <h3>{props.todo.categoryId}</h3> : null}
      <p>{props.todo.description}</p>
    </>
  );
}

export default Task;
