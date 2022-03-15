interface Todo {
  id: number;
  name: string;
  description: string;
  categoryId: number | null;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

interface TodoProps {
  todo: Todo;
}

interface CategoryProps {
  category: Category;
}
