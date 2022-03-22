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

interface DropdownProps {
  onSelect: (id: number | null) => void;
  title: string;
  isListOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  resetThenSet: (id: number | null) => void;
  list: CategorySelect[];
}

type CategorySelect = {
  id: number | null;
  title: string;
  selected: boolean;
  key: string;
};

type PageState = "tasks" | "categories" | null;

type PageContext = {
  page: PageState;
  setPage: React.Dispatch<React.SetStateAction<PageState>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  selectList: CategorySelect[];
  setSelectList: React.Dispatch<React.SetStateAction<CategorySelect[]>>;
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
