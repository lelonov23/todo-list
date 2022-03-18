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

interface TodoData {
  name: string;
  description?: string;
  categoryId?: number;
}

interface CatData {
  name: string;
  description?: string;
}

interface TodoProps {
  todo: Todo;
}

interface CategoryProps {
  category: Category;
}

interface ModalProps {
  children: React.ReactNode;
  show?: boolean;
  onClose: () => void;
}

interface CreateFormProps {
  onClose: () => void;
}

type PageState = "tasks" | "categories" | null;

type PageContext = {
  page: PageState;
  setPage: React.Dispatch<React.SetStateAction<PageState>>;
};
