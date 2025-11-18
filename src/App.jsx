import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import Category from "./components/Category";
import CategoryPage from "./components/CategoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:name" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
