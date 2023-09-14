// REACT ROUTER DOM
import { Routes, Route } from "react-router-dom";

// PAGES
import HomePage from "./pages/HomePage";
function App() {
  return <Routes>
    <Route path="/" element={<HomePage />}/>
  </Routes>;
}

export default App;
