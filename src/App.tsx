import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/navbar';
import { Footer } from './components/layout/footer';
import { Home } from './pages/home';
import { WordDetail } from './pages/word-detail';
import { Browse } from './pages/browse';
import { SearchResults } from './pages/search-results';
import { AddDefinition } from './pages/add-definition';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/word/:slug" element={<WordDetail />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/browse/:letter" element={<Browse />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/add" element={<AddDefinition />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
