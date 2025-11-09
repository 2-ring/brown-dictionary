import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../common/search-bar';
import { Sidebar } from './sidebar';

export const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="bg-ud-navy border-b border-ud-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold">
              <span className="text-ud-text">ur</span>
              <span className="text-ud-blue">ban</span>
              <div className="text-[10px] text-ud-blue tracking-wider">DICTIONARY</div>
            </div>
          </Link>

          <SearchBar />

          <div className="flex items-center gap-2">
            <button className="p-2 text-ud-text-muted hover:text-ud-text transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link
              to="/add"
              className="bg-ud-blue hover:bg-ud-blue-bright text-white p-2 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-ud-blue hover:bg-ud-blue-bright text-white p-2 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};
