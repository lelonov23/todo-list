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

interface PageProps {
  pageSetter: React.Dispatch<React.SetStateAction<PageState>>;
}

interface HeaderProps {
  page: PageState;
}

interface ModalProps {
  children: React.ReactNode;
  show?: boolean;
  onClose: () => void;
}

type PageState = "tasks" | "categories" | null;
