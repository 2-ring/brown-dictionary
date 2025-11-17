import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlphabetGrid } from '../browse/alphabet-grid';

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DropdownMenu = ({ isOpen, onClose }: DropdownMenuProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Dropdown menu from top */}
      <div className="fixed top-[73px] left-0 right-0 bg-navbar border-b border-border z-50 overflow-y-auto max-h-[calc(100vh-73px)] shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Navigation menu */}
            <nav className="shrink-0 space-y-2">
              <Link
                to="/"
                onClick={onClose}
                className="block px-4 py-3 text-text hover:bg-card-secondary rounded transition-colors"
              >
                Home
              </Link>

              <Link
                to="/add"
                onClick={onClose}
                className="block px-4 py-3 text-text hover:bg-card-secondary rounded transition-colors"
              >
                Add a Definition
              </Link>

              <div className="border-t border-border my-4" />

              <a
                href="#"
                className="block px-4 py-3 text-text hover:bg-card-secondary rounded transition-colors"
              >
                User Settings
              </a>
            </nav>

            {/* Alphabet grid */}
            <div className="w-full md:w-auto md:max-w-lg">
              <AlphabetGrid />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
