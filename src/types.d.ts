interface Todo {
  id: number;
  name: string;
  description: string;
  categoryId: number | null;
}

type AppProps = {
  todo: Todo;
};
