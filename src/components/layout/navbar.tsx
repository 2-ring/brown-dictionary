import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../common/search-bar';
import { Sidebar } from './sidebar';

export const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="bg-background border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center flex-shrink-0">
            <div className="text-2xl font-bold leading-none">
              <span className="text-text">ur</span>
              <span className="text-primary">ban</span>
              <div className="text-[9px] text-primary tracking-widest mt-0.5">DICTIONARY</div>
            </div>
          </Link>

          <SearchBar />

          <div className="flex items-center gap-2">
            <Link
              to="/add"
              className="bg-primary hover:bg-primary-hover text-white p-2 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-primary hover:bg-primary-hover text-white p-2 rounded-full transition-colors"
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
