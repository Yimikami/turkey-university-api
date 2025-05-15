import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import UniversityListPage from "./pages/UniversityListPage";
import UniversityDetailPage from "./pages/UniversityDetailPage";
import SearchResultsPage from "./pages/SearchResultsPage";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/universities" element={<UniversityListPage />} />
          <Route path="/universities/:id" element={<UniversityDetailPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
