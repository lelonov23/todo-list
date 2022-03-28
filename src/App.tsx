import { useState, createContext, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./routes/Tasks";
import Categories from "./routes/Categories";
import "./App.css";
import { Route, Routes } from "react-router-dom";

export const PageContext = createContext<PageContext>({
  page: null,
  setPage: () => {},
  categories: [],
  setCategories: () => {},
  todos: [],
  setTodos: () => {},
  selectList: [],
  setSelectList: () => {},
  isListOpen: false,
  setIsListOpen: () => {},
});

function App() {
  const [page, setPage] = useState<PageState>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectList, setSelectList] = useState<CategorySelect[]>([
    { id: 0, title: "Выберите категорию", selected: true, key: "category" },
  ]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isListOpen, setIsListOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8089/api/ToDoList/GetCategories")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Unable to fetch categories");
      })
      .then((data) => {
        setCategories(data);
      });

    fetch("http://localhost:8089/api/ToDoList/GetTasks")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Unable to fetch tasks");
      })
      .then((data) => {
        setTodos(data);
      });
  }, []);

  useEffect(() => {
    const selectData = categories.map((cat) => {
      return {
        id: cat.id,
        title: cat.name,
        selected: false,
        key: "category",
      };
    });
    setSelectList([
      { id: 0, title: "Выберите категорию", selected: true, key: "category" },
      ...selectData,
    ]);
  }, [categories]);

  return (
    <div className="App">
      <PageContext.Provider
        value={{
          page,
          setPage,
          categories,
          setCategories,
          todos,
          setTodos,
          selectList,
          setSelectList,
          isListOpen,
          setIsListOpen,
        }}
      >
        <Header />
        <Routes>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </PageContext.Provider>
    </div>
  );
}

export default App;
