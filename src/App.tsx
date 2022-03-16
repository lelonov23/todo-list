import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./routes/Tasks";
import Categories from "./routes/Categories";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  const [page, setPage] = useState<PageState>(null);

  return (
    <div className="App">
      <Header page={page} />
      <Routes>
        <Route path="/tasks" element={<Tasks pageSetter={setPage} />} />
        <Route
          path="/categories"
          element={<Categories pageSetter={setPage} />}
        />
      </Routes>
    </div>
  );
}

export default App;
