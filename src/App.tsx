import { useState, createContext } from "react";
import Header from "./components/Header";
import Tasks from "./routes/Tasks";
import Categories from "./routes/Categories";
import "./App.css";
import { Route, Routes } from "react-router-dom";

export const PageContext = createContext<PageContext>({
  page: null,
  setPage: () => {},
});

function App() {
  const [page, setPage] = useState<PageState>(null);

  return (
    <div className="App">
      <PageContext.Provider value={{ page, setPage }}>
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
