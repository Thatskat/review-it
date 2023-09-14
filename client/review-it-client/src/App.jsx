// REACT ROUTER DOM
import { Routes, Route } from "react-router-dom";

// PAGES
import HomePage from "./pages/HomePage";

// LAYOUT
import Layout from "./components/layout/Layout";
function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
