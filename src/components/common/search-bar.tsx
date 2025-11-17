import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-2xl">
      <div className="relative">
        <button
          type="submit"
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type any word..."
          className="w-full bg-card-secondary text-text pl-11 sm:pl-12 pr-5 py-3 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-text-muted text-base"
        />
      </div>
    </form>
  );
};
